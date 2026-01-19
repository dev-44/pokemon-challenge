import prisma from '@/config/database';
import { FavoriteList } from '@prisma/client';
import { safeJsonStringify, safeJsonParse } from '@/utils/helpers';

/**
 * Repository class for managing favorite lists in the database
 * Handles all database operations related to favorite lists
 */
export class FavoritesRepository {
  /**
   * Create a new favorite list
   * @param uniqueCode - Unique code for the list
   * @param pokemonIds - Array of Pokemon IDs
   * @returns Created favorite list
   */
  async create(uniqueCode: string, pokemonIds: number[]): Promise<FavoriteList> {
    return await prisma.favoriteList.create({
      data: {
        uniqueCode,
        pokemonIds: safeJsonStringify(pokemonIds),
      },
    });
  }

  /**
   * Find a favorite list by unique code
   * @param code - Unique code to search for
   * @returns Favorite list or null if not found
   */
  async findByCode(code: string): Promise<FavoriteList | null> {
    return await prisma.favoriteList.findUnique({
      where: {
        uniqueCode: code,
      },
    });
  }

  /**
   * Find a favorite list by ID
   * @param id - List ID
   * @returns Favorite list or null if not found
   */
  async findById(id: string): Promise<FavoriteList | null> {
    return await prisma.favoriteList.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Check if a code already exists
   * @param code - Code to check
   * @returns True if code exists, false otherwise
   */
  async codeExists(code: string): Promise<boolean> {
    const count = await prisma.favoriteList.count({
      where: {
        uniqueCode: code,
      },
    });
    return count > 0;
  }

  /**
   * Get all favorite lists (for admin/testing purposes)
   * @param limit - Maximum number of lists to return
   * @returns Array of favorite lists
   */
  async findAll(limit = 100): Promise<FavoriteList[]> {
    return await prisma.favoriteList.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Delete a favorite list by code (for testing/admin)
   * @param code - Unique code
   * @returns Deleted favorite list or null
   */
  async deleteByCode(code: string): Promise<FavoriteList | null> {
    try {
      return await prisma.favoriteList.delete({
        where: {
          uniqueCode: code,
        },
      });
    } catch {
      return null;
    }
  }

  /**
   * Parse Pokemon IDs from database string to array
   * @param favoriteList - Favorite list from database
   * @returns Favorite list with parsed Pokemon IDs
   */
  parsePokemonIds(favoriteList: FavoriteList): FavoriteList & { parsedPokemonIds: number[] } {
    return {
      ...favoriteList,
      parsedPokemonIds: safeJsonParse<number[]>(favoriteList.pokemonIds, []),
    };
  }
}

// Export singleton instance
export const favoritesRepository = new FavoritesRepository();
