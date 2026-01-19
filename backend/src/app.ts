import express, { Application } from 'express';
import { helmetConfig, corsConfig, rateLimiter } from '@/middlewares/security';
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler';
import favoritesRoutes from '@/routes/favorites.routes';

/**
 * Create and configure Express application
 */
export const createApp = (): Application => {
  const app = express();

  // Security middlewares
  app.use(helmetConfig);
  app.use(corsConfig);
  app.use(rateLimiter);

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Handle JSON parsing errors
  app.use(
    (err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON',
        });
      }
      return next(err);
    }
  );

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api/favorites', favoritesRoutes);

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

export default createApp;
