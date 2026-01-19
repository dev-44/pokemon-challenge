import { pokeApiClient } from "./config";
import type {
  PokemonListResponse,
  PokemonDetail,
  Pokemon,
} from "@/types/pokemon.types";

/**
 * PokeAPI Service
 * Handles all interactions with the PokeAPI
 */
class PokeAPIService {
  /**
   * Get a paginated list of Pokemon
   * @param limit - Number of Pokemon to fetch (default: 20)
   * @param offset - Offset for pagination (default: 0)
   */
  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const response = await pokeApiClient.get<PokemonListResponse>("/pokemon", {
      params: { limit, offset },
    });
    return response.data;
  }

  /**
   * Get detailed information about a specific Pokemon
   * @param idOrName - Pokemon ID or name
   */
  async getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
    const response = await pokeApiClient.get<PokemonDetail>(
      `/pokemon/${idOrName}`,
    );
    return response.data;
  }

  /**
   * Get multiple Pokemon details by IDs
   * @param ids - Array of Pokemon IDs
   */
  async getPokemonByIds(ids: number[]): Promise<Pokemon[]> {
    const promises = ids.map((id) => this.getPokemonDetail(id));
    const results = await Promise.allSettled(promises);

    return results
      .filter((result) => result.status === "fulfilled")
      .map((result) => {
        const pokemon = (result as PromiseFulfilledResult<PokemonDetail>).value;
        return this.transformPokemonDetail(pokemon);
      });
  }

  /**
   * Search Pokemon by name (partial match)
   * @param query - Search query
   */
  async searchPokemon(query: string): Promise<Pokemon[]> {
    // PokeAPI doesn't have a search endpoint, so we fetch all and filter
    // In production, you'd want to cache this or use a better approach
    const { results } = await this.getPokemonList(1000, 0);

    const filtered = results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()),
    );

    // Fetch details for filtered results (limit to 20)
    const detailPromises = filtered
      .slice(0, 20)
      .map((pokemon) => this.getPokemonDetail(pokemon.name));

    const details = await Promise.all(detailPromises);
    return details.map(this.transformPokemonDetail);
  }

  /**
   * Get Pokemon by type
   * @param type - Pokemon type (e.g., 'fire', 'water')
   */
  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const response = await pokeApiClient.get(`/type/${type}`);
    const pokemonList = response.data.pokemon.slice(0, 20); // Limit to 20

    const detailPromises = pokemonList.map((p: { pokemon: { name: string } }) =>
      this.getPokemonDetail(p.pokemon.name),
    );

    const details = await Promise.all(detailPromises);
    return details.map(this.transformPokemonDetail);
  }

  /**
   * Transform PokemonDetail to simplified Pokemon model
   * @param detail - Full Pokemon detail from API
   */
  private transformPokemonDetail(detail: PokemonDetail): Pokemon {
    return {
      id: detail.id,
      name: detail.name,
      image:
        detail.sprites.other["official-artwork"].front_default ||
        detail.sprites.front_default,
      types: detail.types.map((t) => t.type.name),
      height: detail.height,
      weight: detail.weight,
    };
  }

  /**
   * Get all Pokemon types
   */
  async getAllTypes(): Promise<string[]> {
    const response = await pokeApiClient.get("/type");
    return response.data.results.map((type: { name: string }) => type.name);
  }

  /**
   * Get Pokemon generations
   */
  async getGenerations(): Promise<{ name: string; url: string }[]> {
    const response = await pokeApiClient.get("/generation");
    return response.data.results;
  }

  /**
   * Get Pokemon by generation
   * @param generation - Generation number (1-9)
   */
  async getPokemonByGeneration(generation: number): Promise<Pokemon[]> {
    const response = await pokeApiClient.get(`/generation/${generation}`);
    const pokemonSpecies = response.data.pokemon_species.slice(0, 20); // Limit to 20

    const detailPromises = pokemonSpecies.map((species: { name: string }) => {
      // Extract ID from species URL
      const id = species.name;
      return this.getPokemonDetail(id);
    });

    const details = await Promise.all(detailPromises);
    return details.map(this.transformPokemonDetail);
  }

  /**
   * Get random Pokemon
   * @param count - Number of random Pokemon to fetch
   */
  async getRandomPokemon(count = 6): Promise<Pokemon[]> {
    const maxPokemonId = 898; // Total Pokemon in API (gen 1-8)
    const randomIds = Array.from(
      { length: count },
      () => Math.floor(Math.random() * maxPokemonId) + 1,
    );

    return this.getPokemonByIds(randomIds);
  }
}

// Export singleton instance
export const pokeAPI = new PokeAPIService();
