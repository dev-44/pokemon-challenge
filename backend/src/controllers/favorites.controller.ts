import { Request, Response } from 'express';
import { favoritesService } from '@/services/favorites.service';
import { CreateFavoriteListRequest, GetFavoriteListRequest, ApiResponse } from '@/types';

/**
 * Controller class for handling favorite list HTTP requests
 */
export class FavoritesController {
  /**
   * Create a new favorite list
   * POST /api/favorites
   */
  async create(req: CreateFavoriteListRequest, res: Response): Promise<void> {
    const { pokemonIds } = req.body;

    const result = await favoritesService.createFavoriteList(pokemonIds);

    if (!result.success) {
      res.status(result.statusCode).json({
        success: false,
        error: result.error,
      } as ApiResponse);
      return;
    }

    res.status(201).json({
      success: true,
      data: result.data,
    } as ApiResponse);
  }

  /**
   * Get favorite list by unique code
   * GET /api/favorites/:code
   */
  async getByCode(req: GetFavoriteListRequest, res: Response): Promise<void> {
    const { code } = req.params;

    const result = await favoritesService.getFavoritesByCode(code);

    if (!result.success) {
      res.status(result.statusCode).json({
        success: false,
        error: result.error,
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: result.data,
    } as ApiResponse);
  }

  /**
   * Get all favorite lists (for testing/admin)
   * GET /api/favorites
   */
  async getAll(_req: Request, res: Response): Promise<void> {
    const result = await favoritesService.getAllFavorites();

    if (!result.success) {
      res.status(result.statusCode).json({
        success: false,
        error: result.error,
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      data: result.data,
    } as ApiResponse);
  }
}

// Export singleton instance
export const favoritesController = new FavoritesController();
