import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Pokemon } from "@/types/pokemon.types";

/**
 * Favorites Store State
 */
interface FavoritesState {
  // State
  favorites: Pokemon[];
  lastSavedCode: string | null;

  // Actions
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  clearFavorites: () => void;
  setLastSavedCode: (code: string | null) => void;
  setFavorites: (pokemons: Pokemon[]) => void;

  // Getters
  getFavoriteIds: () => number[];
  getFavoriteCount: () => number;
}

/**
 * Favorites Store
 *
 * Manages the list of favorite Pokemon with localStorage persistence
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      // Initial State
      favorites: [],
      lastSavedCode: null,

      /**
       * Add a Pokemon to favorites
       */
      addFavorite: (pokemon) => {
        set((state) => {
          // Check if already in favorites
          if (state.favorites.some((p) => p.id === pokemon.id)) {
            return state;
          }

          // Check maximum limit (50 Pokemon)
          if (state.favorites.length >= 50) {
            console.warn("Maximum 50 Pokemon can be added to favorites");
            return state;
          }

          return {
            favorites: [...state.favorites, pokemon],
          };
        });
      },

      /**
       * Remove a Pokemon from favorites
       */
      removeFavorite: (pokemonId) => {
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== pokemonId),
        }));
      },

      /**
       * Check if a Pokemon is in favorites
       */
      isFavorite: (pokemonId) => {
        const state = get();
        return state.favorites.some((p) => p.id === pokemonId);
      },

      /**
       * Clear all favorites
       */
      clearFavorites: () => {
        set({ favorites: [], lastSavedCode: null });
      },

      /**
       * Set the last saved code
       */
      setLastSavedCode: (code) => {
        set({ lastSavedCode: code });
      },

      /**
       * Set favorites (replace all)
       */
      setFavorites: (pokemons) => {
        // Limit to 50
        const limited = pokemons.slice(0, 50);
        set({ favorites: limited });
      },

      /**
       * Get array of favorite Pokemon IDs
       */
      getFavoriteIds: () => {
        return get().favorites.map((p) => p.id);
      },

      /**
       * Get count of favorites
       */
      getFavoriteCount: () => {
        return get().favorites.length;
      },
    }),
    {
      name: "pokemon-favorites-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist favorites and lastSavedCode
      partialize: (state) => ({
        favorites: state.favorites,
        lastSavedCode: state.lastSavedCode,
      }),
    },
  ),
);
