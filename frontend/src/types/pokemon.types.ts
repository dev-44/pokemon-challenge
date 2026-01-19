// PokeAPI Response Types
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    dream_world: {
      front_default: string;
    };
    home: {
      front_default: string;
    };
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Frontend Pokemon Model (Simplified)
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

// Backend API Types
export interface FavoriteListResponse {
  success: boolean;
  data: {
    id: string;
    uniqueCode: string;
    pokemonIds: number[];
    createdAt: string;
  };
}

export interface CreateFavoriteRequest {
  pokemonIds: number[];
}

export interface ApiError {
  success: false;
  error: string;
}

// Type Guards
export function isPokemonDetail(data: unknown): data is PokemonDetail {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    "types" in data
  );
}
