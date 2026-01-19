import request from 'supertest';
import { createApp } from '../../../src/app';
import { clearDatabase, disconnectDatabase } from '../../helpers/testUtils';

const app = createApp();

describe('Favorites API Integration Tests', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        success: true,
        message: 'Server is running',
      });
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/favorites', () => {
    it('should create a new favorite list', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 25, 150] })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        pokemonIds: [1, 25, 150],
      });
      expect(response.body.data.uniqueCode).toHaveLength(8);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.createdAt).toBeDefined();
    });

    it('should remove duplicate Pokemon IDs', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 1, 25, 25, 150] })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.data.pokemonIds).toEqual([1, 25, 150]);
    });

    it('should reject empty array', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [] })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should reject array with negative IDs', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [-1, 25, 150] })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject array with more than 50 Pokemon', async () => {
      const pokemonIds = Array.from({ length: 51 }, (_, i) => i + 1);

      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should accept exactly 50 Pokemon', async () => {
      const pokemonIds = Array.from({ length: 50 }, (_, i) => i + 1);

      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.pokemonIds).toHaveLength(50);
    });

    it('should reject invalid body format', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ wrong: 'field' })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject non-integer Pokemon IDs', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1.5, 2.7, 3] })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should set correct headers', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 25] })
        .set('Content-Type', 'application/json');

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('GET /api/favorites/:code', () => {
    it('should retrieve existing favorite list', async () => {
      // Create a list first
      const createResponse = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 25, 150] })
        .set('Content-Type', 'application/json');

      const code = createResponse.body.data.uniqueCode;

      // Retrieve it
      const getResponse = await request(app).get(`/api/favorites/${code}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.success).toBe(true);
      expect(getResponse.body.data).toMatchObject({
        uniqueCode: code,
        pokemonIds: [1, 25, 150],
      });
    });

    it('should return 404 for non-existent code', async () => {
      const response = await request(app).get('/api/favorites/AAAAAAAA');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('not found');
    });

    it('should return 400 for invalid code format', async () => {
      const invalidCodes = ['ABC', 'TOOLONGCODE', 'INVALID0', 'BAD-CODE'];

      for (const code of invalidCodes) {
        const response = await request(app).get(`/api/favorites/${code}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      }
    });

    it('should handle URL encoding correctly', async () => {
      const createResponse = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1] })
        .set('Content-Type', 'application/json');

      const code = createResponse.body.data.uniqueCode;
      const encodedCode = encodeURIComponent(code);

      const response = await request(app).get(`/api/favorites/${encodedCode}`);
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/favorites', () => {
    it('should return empty array when no favorites exist', async () => {
      const response = await request(app).get('/api/favorites');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should return all favorite lists', async () => {
      // Create multiple lists
      await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 2, 3] })
        .set('Content-Type', 'application/json');

      await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [4, 5, 6] })
        .set('Content-Type', 'application/json');

      const response = await request(app).get('/api/favorites');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return lists in descending order', async () => {
      const response1 = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1] })
        .set('Content-Type', 'application/json');

      const response2 = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [2] })
        .set('Content-Type', 'application/json');

      const getResponse = await request(app).get('/api/favorites');

      expect(getResponse.body.data[0].uniqueCode).toBe(response2.body.data.uniqueCode);
      expect(getResponse.body.data[1].uniqueCode).toBe(response1.body.data.uniqueCode);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/non-existent');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('not found');
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send('{ malformed json')
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
    });

    it('should validate content-type header', async () => {
      const response = await request(app).post('/api/favorites').send('pokemonIds=1,2,3');

      expect(response.status).toBe(400);
    });
  });

  describe('CORS Headers', () => {
    it('should include CORS headers', async () => {
      const response = await request(app).get('/health').set('Origin', 'http://localhost:5173');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Complete Flow', () => {
    it('should complete create -> retrieve -> verify flow', async () => {
      // Step 1: Create
      const createResponse = await request(app)
        .post('/api/favorites')
        .send({ pokemonIds: [1, 4, 7, 25, 150] })
        .set('Content-Type', 'application/json');

      expect(createResponse.status).toBe(201);
      const code = createResponse.body.data.uniqueCode;

      // Step 2: Retrieve
      const getResponse = await request(app).get(`/api/favorites/${code}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data.pokemonIds).toEqual([1, 4, 7, 25, 150]);

      // Step 3: Verify in list
      const listResponse = await request(app).get('/api/favorites');

      expect(listResponse.status).toBe(200);
      const found = listResponse.body.data.find((item: any) => item.uniqueCode === code);
      expect(found).toBeDefined();
      expect(found.pokemonIds).toEqual([1, 4, 7, 25, 150]);
    });
  });
});
