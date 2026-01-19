import { describe, it, expect, beforeEach } from "vitest";
import { useFavoritesStore } from "./favorites.store";
import { mockPokemon, mockPokemonList } from "@/test/mockData";

describe("Favorites Store", () => {
  beforeEach(() => {
    // Reset store before each test
    const { clearFavorites } = useFavoritesStore.getState();
    clearFavorites();
  });

  it("starts with empty favorites", () => {
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
  });

  it("adds Pokemon to favorites", () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite(mockPokemon);
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(mockPokemon);
  });

  it("prevents duplicate Pokemon", () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite(mockPokemon);
    addFavorite(mockPokemon); // Try to add again
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
  });

  it("enforces 50 Pokemon limit", () => {
    const { addFavorite } = useFavoritesStore.getState();

    // Add 50 Pokemon
    for (let i = 1; i <= 50; i++) {
      addFavorite({ ...mockPokemon, id: i });
    }

    let { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(50);

    // Try to add 51st
    addFavorite({ ...mockPokemon, id: 51 });

    favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(50); // Still 50
  });

  it("removes Pokemon from favorites", () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState();

    addFavorite(mockPokemon);

    let { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);

    removeFavorite(mockPokemon.id);

    favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });

  it("checks if Pokemon is favorite", () => {
    const { addFavorite, isFavorite } = useFavoritesStore.getState();

    expect(isFavorite(mockPokemon.id)).toBe(false);

    addFavorite(mockPokemon);

    const updatedIsFavorite = useFavoritesStore.getState().isFavorite;
    expect(updatedIsFavorite(mockPokemon.id)).toBe(true);
  });

  it("clears all favorites", () => {
    const { addFavorite, clearFavorites } = useFavoritesStore.getState();

    mockPokemonList.forEach(addFavorite);

    let { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(3);

    clearFavorites();

    favorites = useFavoritesStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });

  it("sets favorites from array", () => {
    const { setFavorites } = useFavoritesStore.getState();

    setFavorites(mockPokemonList);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual(mockPokemonList);
  });

  it("limits setFavorites to 50 Pokemon", () => {
    const { setFavorites } = useFavoritesStore.getState();

    const manyPokemon = Array.from({ length: 60 }, (_, i) => ({
      ...mockPokemon,
      id: i + 1,
    }));

    setFavorites(manyPokemon);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(50);
  });

  it("gets favorite IDs", () => {
    const { addFavorite, getFavoriteIds } = useFavoritesStore.getState();

    mockPokemonList.forEach(addFavorite);

    const ids = useFavoritesStore.getState().getFavoriteIds();
    expect(ids).toEqual([1, 4, 7]);
  });

  it("gets favorite count", () => {
    const { addFavorite, getFavoriteCount } = useFavoritesStore.getState();

    expect(getFavoriteCount()).toBe(0);

    addFavorite(mockPokemon);

    let count = useFavoritesStore.getState().getFavoriteCount();
    expect(count).toBe(1);

    mockPokemonList.forEach(addFavorite);

    count = useFavoritesStore.getState().getFavoriteCount();
    expect(count).toBe(4); // pikachu + 3 from list
  });

  it("stores and retrieves last saved code", () => {
    const { setLastSavedCode, lastSavedCode } = useFavoritesStore.getState();

    expect(lastSavedCode).toBeNull();

    setLastSavedCode("ABC12345");
    expect(useFavoritesStore.getState().lastSavedCode).toBe("ABC12345");

    setLastSavedCode(null);
    expect(useFavoritesStore.getState().lastSavedCode).toBeNull();
  });
});
