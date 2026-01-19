import { useState, useCallback } from "react";
import { backendAPI } from "@/api";
import { pokeAPI } from "@/api";
import { useFavoritesStore } from "@/stores";
import { useUIStore } from "@/stores";
import type { Pokemon } from "@/types/pokemon.types";

/**
 * Hook to manage favorites with backend integration
 */
export const useFavorites = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    setFavorites,
    getFavoriteIds,
    getFavoriteCount,
    setLastSavedCode,
    lastSavedCode,
  } = useFavoritesStore();

  const { addToast } = useUIStore();

  /**
   * Save favorites to backend and get shareable code
   */
  const saveFavorites = useCallback(async (): Promise<string | null> => {
    if (favorites.length === 0) {
      addToast({
        type: "warning",
        message: "No favorites to save",
      });
      return null;
    }

    setSaving(true);

    try {
      const pokemonIds = getFavoriteIds();
      const result = await backendAPI.saveFavorites(pokemonIds);

      if (result.success) {
        const code = result.data.uniqueCode;
        setLastSavedCode(code);
        addToast({
          type: "success",
          message: `Favorites saved! Code: ${code}`,
          duration: 5000,
        });
        return code;
      } else {
        addToast({
          type: "error",
          message:
            "error" in result ? result.error : "Failed to save favorites",
        });
        return null;
      }
    } catch (err) {
      addToast({
        type: "error",
        message: "Failed to save favorites",
      });
      console.error(err);
      return null;
    } finally {
      setSaving(false);
    }
  }, [favorites.length, getFavoriteIds, setLastSavedCode, addToast]);

  /**
   * Load favorites from a shared code
   */
  const loadFromCode = useCallback(
    async (code: string): Promise<boolean> => {
      if (!code || code.trim().length !== 8) {
        addToast({
          type: "error",
          message: "Invalid code format",
        });
        return false;
      }

      setLoading(true);

      try {
        const result = await backendAPI.getFavoritesByCode(code);

        if (result.success) {
          const pokemonIds = result.data.pokemonIds;
          const pokemonList = await pokeAPI.getPokemonByIds(pokemonIds);

          setFavorites(pokemonList);
          setLastSavedCode(code);

          addToast({
            type: "success",
            message: `Loaded ${pokemonList.length} Pokemon from code`,
          });
          return true;
        } else {
          addToast({
            type: "error",
            message:
              "error" in result ? result.error : "Failed to load favorites",
          });
          return false;
        }
      } catch (err) {
        addToast({
          type: "error",
          message: "Failed to load favorites",
        });
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setFavorites, setLastSavedCode, addToast],
  );

  /**
   * Add Pokemon to favorites with toast notification
   */
  const addWithNotification = useCallback(
    (pokemon: Pokemon) => {
      if (getFavoriteCount() >= 50) {
        addToast({
          type: "warning",
          message: "Maximum 50 Pokemon in favorites",
        });
        return;
      }

      addFavorite(pokemon);
      addToast({
        type: "success",
        message: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} added to favorites`,
        duration: 2000,
      });
    },
    [addFavorite, getFavoriteCount, addToast],
  );

  /**
   * Remove Pokemon from favorites with toast notification
   */
  const removeWithNotification = useCallback(
    (pokemon: Pokemon) => {
      removeFavorite(pokemon.id);
      addToast({
        type: "info",
        message: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} removed from favorites`,
        duration: 2000,
      });
    },
    [removeFavorite, addToast],
  );

  /**
   * Clear all favorites
   */
  const clearAllFavorites = useCallback(() => {
    clearFavorites();
    addToast({
      type: "info",
      message: "All favorites cleared",
    });
  }, [clearFavorites, addToast]);

  /**
   * Toggle favorite with notification
   */
  const toggleWithNotification = useCallback(
    (pokemon: Pokemon) => {
      if (isFavorite(pokemon.id)) {
        removeWithNotification(pokemon);
      } else {
        addWithNotification(pokemon);
      }
    },
    [isFavorite, addWithNotification, removeWithNotification],
  );

  return {
    // State
    favorites,
    favoriteCount: getFavoriteCount(),
    favoriteIds: getFavoriteIds(),
    lastSavedCode,
    saving,
    loading,

    // Actions
    addFavorite: addWithNotification,
    removeFavorite: removeWithNotification,
    toggleFavorite: toggleWithNotification,
    isFavorite,
    clearFavorites: clearAllFavorites,
    saveFavorites,
    loadFromCode,
  };
};
