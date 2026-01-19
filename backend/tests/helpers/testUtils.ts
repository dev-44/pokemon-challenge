import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Clear all data from the database
 */
export const clearDatabase = async () => {
  await prisma.favoriteList.deleteMany({});
};

/**
 * Disconnect from database
 */
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

/**
 * Create a test favorite list
 */
export const createTestFavoriteList = async (pokemonIds: number[], uniqueCode?: string) => {
  const code = uniqueCode || `TEST${Math.random().toString(36).substring(7)}`;

  return await prisma.favoriteList.create({
    data: {
      uniqueCode: code,
      pokemonIds: JSON.stringify(pokemonIds),
    },
  });
};

/**
 * Generate random Pokemon IDs
 */
export const generateRandomPokemonIds = (count: number): number[] => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 898) + 1);
};

/**
 * Sleep utility for async tests
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
