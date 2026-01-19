import { favoritesService } from '../../../src/services/favorites.service';
import { clearDatabase, disconnectDatabase } from '../../helpers/testUtils';

describe('Favorites Service', () => {
  // Clean database before each test
  beforeEach(async () => {
    await clearDatabase();
  });

  // Disconnect after all tests
  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('createFavoriteList', () => {
    it('should create a favorite list successfully', async () => {
      const pokemonIds = [1, 25, 150];
      const result = await favoritesService.createFavoriteList(pokemonIds);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pokemonIds).toEqual(pokemonIds);
        expect(result.data.uniqueCode).toHaveLength(8);
        expect(result.data.id).toBeDefined();
        expect(result.data.createdAt).toBeInstanceOf(Date);
      }
    });

    it('should remove duplicate Pokemon IDs', async () => {
      const pokemonIds = [1, 1, 25, 25, 150];
      const result = await favoritesService.createFavoriteList(pokemonIds);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pokemonIds).toEqual([1, 25, 150]);
      }
    });

    it('should reject empty arrays', async () => {
      const result = await favoritesService.createFavoriteList([]);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.statusCode).toBe(400);
        expect(result.error).toContain('At least one');
      }
    });

    it('should reject arrays with more than 50 Pokemon', async () => {
      const pokemonIds = Array.from({ length: 51 }, (_, i) => i + 1);
      const result = await favoritesService.createFavoriteList(pokemonIds);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.statusCode).toBe(400);
        expect(result.error).toContain('50');
      }
    });

    it('should accept exactly 50 Pokemon', async () => {
      const pokemonIds = Array.from({ length: 50 }, (_, i) => i + 1);
      const result = await favoritesService.createFavoriteList(pokemonIds);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.pokemonIds).toHaveLength(50);
      }
    });

    it('should generate unique codes for different lists', async () => {
      const result1 = await favoritesService.createFavoriteList([1, 2, 3]);
      const result2 = await favoritesService.createFavoriteList([4, 5, 6]);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);

      if (result1.success && result2.success) {
        expect(result1.data.uniqueCode).not.toBe(result2.data.uniqueCode);
      }
    });
  });

  describe('getFavoritesByCode', () => {
    it('should retrieve existing favorite list', async () => {
      // First create a list
      const createResult = await favoritesService.createFavoriteList([1, 25, 150]);
      expect(createResult.success).toBe(true);

      if (createResult.success) {
        const code = createResult.data.uniqueCode;

        // Then retrieve it
        const getResult = await favoritesService.getFavoritesByCode(code);
        expect(getResult.success).toBe(true);

        if (getResult.success) {
          expect(getResult.data.uniqueCode).toBe(code);
          expect(getResult.data.pokemonIds).toEqual([1, 25, 150]);
        }
      }
    });

    it('should return error for non-existent code', async () => {
      const result = await favoritesService.getFavoritesByCode('AAAAAAAA');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.statusCode).toBe(404);
        expect(result.error).toContain('not found');
      }
    });

    it('should return error for invalid code format', async () => {
      const invalidCodes = ['ABC', 'TOOLONGCODE', 'INVALID0', 'BAD-CODE'];

      for (const code of invalidCodes) {
        const result = await favoritesService.getFavoritesByCode(code);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.statusCode).toBe(400);
        }
      }
    });

    it('should handle codes with correct format but not in database', async () => {
      const result = await favoritesService.getFavoritesByCode('Xy3K9mN2');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.statusCode).toBe(404);
      }
    });
  });

  describe('getAllFavorites', () => {
    it('should return empty array when no favorites exist', async () => {
      const result = await favoritesService.getAllFavorites();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual([]);
      }
    });

    it('should return all favorite lists', async () => {
      // Create multiple lists
      await favoritesService.createFavoriteList([1, 2, 3]);
      await favoritesService.createFavoriteList([4, 5, 6]);
      await favoritesService.createFavoriteList([7, 8, 9]);

      const result = await favoritesService.getAllFavorites();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(3);
        expect(result.data[0].pokemonIds).toBeDefined();
        expect(result.data[0].uniqueCode).toBeDefined();
      }
    });

    it('should return lists in descending order (newest first)', async () => {
      const result1 = await favoritesService.createFavoriteList([1]);
      const result2 = await favoritesService.createFavoriteList([2]);

      const allResult = await favoritesService.getAllFavorites();

      expect(allResult.success).toBe(true);
      if (allResult.success && result1.success && result2.success) {
        // Most recent should be first
        expect(allResult.data[0].uniqueCode).toBe(result2.data.uniqueCode);
        expect(allResult.data[1].uniqueCode).toBe(result1.data.uniqueCode);
      }
    });
  });
});
