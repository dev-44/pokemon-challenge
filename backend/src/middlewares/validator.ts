import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

/**
 * Validation schemas for the API
 */
export const schemas = {
  // Schema for creating a favorite list
  createFavoriteList: z.object({
    body: z.object({
      pokemonIds: z
        .array(z.number().int().positive())
        .min(1, 'At least one Pokemon ID is required')
        .max(50, 'Maximum 50 Pokemon allowed per list'),
    }),
  }),

  // Schema for getting favorites by code
  getFavoritesByCode: z.object({
    params: z.object({
      code: z
        .string()
        .length(8, 'Code must be exactly 8 characters')
        .regex(/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/, {
          message: 'Invalid code format',
        }),
    }),
  }),
};

/**
 * Generic validation middleware factory
 */
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
