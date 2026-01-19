import { useState, useEffect, useCallback } from "react";
import { pokeAPI } from "@/api";
import type { Pokemon } from "@/types/pokemon.types";

/**
 * Hook to fetch and manage Pokemon list
 */
export const usePokemonList = (limit = 20, initialOffset = 0) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemon = useCallback(
    async (newOffset: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await pokeAPI.getPokemonList(limit, newOffset);
        const detailPromises = response.results.map((p) =>
          pokeAPI.getPokemonDetail(p.name),
        );
        const details = await Promise.all(detailPromises);
        const transformed = details.map((d) => ({
          id: d.id,
          name: d.name,
          image:
            d.sprites.other["official-artwork"].front_default ||
            d.sprites.front_default,
          types: d.types.map((t) => t.type.name),
          height: d.height,
          weight: d.weight,
        }));

        setPokemon((prev) =>
          newOffset === 0 ? transformed : [...prev, ...transformed],
        );
        setHasMore(response.next !== null);
      } catch (err) {
        setError("Failed to fetch Pokemon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchPokemon(offset);
  }, [offset, fetchPokemon]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + limit);
    }
  }, [loading, hasMore, limit]);

  const refresh = useCallback(() => {
    setOffset(0);
    setPokemon([]);
  }, []);

  return {
    pokemon,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

/**
 * Hook to fetch a single Pokemon
 */
export const usePokemonDetail = (idOrName: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const detail = await pokeAPI.getPokemonDetail(idOrName);
        setPokemon({
          id: detail.id,
          name: detail.name,
          image:
            detail.sprites.other["official-artwork"].front_default ||
            detail.sprites.front_default,
          types: detail.types.map((t) => t.type.name),
          height: detail.height,
          weight: detail.weight,
        });
      } catch (err) {
        setError("Failed to fetch Pokemon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (idOrName) {
      fetchPokemon();
    }
  }, [idOrName]);

  return { pokemon, loading, error };
};

/**
 * Hook to search Pokemon
 */
export const usePokemonSearch = () => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pokemon = await pokeAPI.searchPokemon(query);
      setResults(pokemon);
    } catch (err) {
      setError("Search failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clear };
};

/**
 * Hook to filter Pokemon by type
 */
export const usePokemonByType = (type: string | null) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) {
      setPokemon([]);
      return;
    }

    const fetchByType = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await pokeAPI.getPokemonByType(type);
        setPokemon(results);
      } catch (err) {
        setError("Failed to fetch Pokemon by type");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchByType();
  }, [type]);

  return { pokemon, loading, error };
};

/**
 * Hook to get random Pokemon
 */
export const useRandomPokemon = (count = 6) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await pokeAPI.getRandomPokemon(count);
      setPokemon(results);
    } catch (err) {
      setError("Failed to fetch random Pokemon");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return { pokemon, loading, error, refresh: fetchRandom };
};
