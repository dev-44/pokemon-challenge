import { Router } from 'express';
import { favoritesController } from '@/controllers/favorites.controller';
import { validate, schemas } from '@/middlewares/validator';
import { asyncHandler } from '@/middlewares/errorHandler';

const router = Router();

/**
 * POST /api/favorites
 * Create a new favorite list
 * Body: { pokemonIds: number[] }
 */
router.post(
  '/',
  validate(schemas.createFavoriteList),
  asyncHandler(async (req, res) => {
    await favoritesController.create(req, res);
  })
);

/**
 * GET /api/favorites/:code
 * Get favorite list by unique code
 * Params: { code: string }
 */
router.get(
  '/:code',
  validate(schemas.getFavoritesByCode),
  asyncHandler(async (req, res) => {
    await favoritesController.getByCode(req as any, res);
  })
);

/**
 * GET /api/favorites
 * Get all favorite lists (for testing/admin)
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    await favoritesController.getAll(req, res);
  })
);

export default router;
