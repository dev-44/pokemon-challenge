import { favoritesRepository } from '@/repositories/favorites.repository';
import { generateUniqueCode, isValidCode } from '@/utils/codeGenerator';
import { removeDuplicates } from '@/utils/helpers';
import { FavoriteListResponse, ServiceResponse } from '@/types';
// import { AppError } from '@/middlewares/errorHandler';

/**
 * Service class for managing favorite lists
 * Contains business logic for creating and retrieving favorite lists
 */
export class FavoritesService {
  /**
   * Create a new favorite list with a unique code
   * @param pokemonIds - Array of Pokemon IDs
   * @returns Service response with created list or error
   */
  async createFavoriteList(pokemonIds: number[]): Promise<ServiceResponse<FavoriteListResponse>> {
    try {
      // Remove duplicates and validate
      const uniquePokemonIds = removeDuplicates(pokemonIds);

      if (uniquePokemonIds.length === 0) {
        return {
          success: false,
          error: 'At least one Pokemon ID is required',
          statusCode: 400,
        };
      }

      if (uniquePokemonIds.length > 50) {
        return {
          success: false,
          error: 'Maximum 50 Pokemon allowed per list',
          statusCode: 400,
        };
      }

      // Generate unique code (retry if collision occurs)
      // Store in uppercase for consistency
      let uniqueCode = generateUniqueCode().toUpperCase();
      let attempts = 0;
      const maxAttempts = 5;

      while (await favoritesRepository.codeExists(uniqueCode)) {
        if (attempts >= maxAttempts) {
          return {
            success: false,
            error: 'Failed to generate unique code. Please try again.',
            statusCode: 500,
          };
        }
        uniqueCode = generateUniqueCode().toUpperCase();
        attempts++;
      }

      // Create favorite list
      const favoriteList = await favoritesRepository.create(uniqueCode, uniquePokemonIds);

      return {
        success: true,
        data: {
          id: favoriteList.id,
          uniqueCode: favoriteList.uniqueCode,
          pokemonIds: uniquePokemonIds,
          createdAt: favoriteList.createdAt,
        },
      };
    } catch (error) {
      console.error('Error creating favorite list:', error);
      return {
        success: false,
        error: 'Failed to create favorite list',
        statusCode: 500,
      };
    }
  }

  /**
   * Retrieve a favorite list by its unique code
   * @param code - Unique code to search for
   * @returns Service response with favorite list or error
   */
  async getFavoritesByCode(code: string): Promise<ServiceResponse<FavoriteListResponse>> {
    try {
      // Normalize code to uppercase for case-insensitive search
      const normalizedCode = code.toUpperCase();

      // Validate code format
      if (!isValidCode(normalizedCode)) {
        return {
          success: false,
          error: 'Invalid code format',
          statusCode: 400,
        };
      }

      // Find favorite list
      const favoriteList = await favoritesRepository.findByCode(normalizedCode);

      if (!favoriteList) {
        return {
          success: false,
          error: 'Favorites list not found',
          statusCode: 404,
        };
      }

      // Parse and return
      const parsed = favoritesRepository.parsePokemonIds(favoriteList);

      return {
        success: true,
        data: {
          id: favoriteList.id,
          uniqueCode: favoriteList.uniqueCode,
          pokemonIds: parsed.parsedPokemonIds,
          createdAt: favoriteList.createdAt,
        },
      };
    } catch (error) {
      console.error('Error retrieving favorite list:', error);
      return {
        success: false,
        error: 'Failed to retrieve favorite list',
        statusCode: 500,
      };
    }
  }

  /**
   * Get all favorite lists (for admin/testing)
   * @returns Array of favorite lists
   */
  async getAllFavorites(): Promise<ServiceResponse<FavoriteListResponse[]>> {
    try {
      const favoriteLists = await favoritesRepository.findAll();

      const data = favoriteLists.map(list => {
        const parsed = favoritesRepository.parsePokemonIds(list);
        return {
          id: list.id,
          uniqueCode: list.uniqueCode,
          pokemonIds: parsed.parsedPokemonIds,
          createdAt: list.createdAt,
        };
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return {
        success: false,
        error: 'Failed to retrieve favorite lists',
        statusCode: 500,
      };
    }
  }
}

// Export singleton instance
export const favoritesService = new FavoritesService();
