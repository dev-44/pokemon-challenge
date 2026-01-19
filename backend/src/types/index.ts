import { Request } from "express";

// Pokemon types
export interface Pokemon {
  id: number;
  name: string;
  sprites?: {
    front_default?: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
  height?: number;
  weight?: number;
}

// Favorite List types
export interface FavoriteListData {
  pokemonIds: number[];
}

export interface FavoriteListResponse {
  id: string;
  uniqueCode: string;
  pokemonIds: number[];
  createdAt: Date;
}

export interface CreateFavoriteListRequest extends Request {
  body: FavoriteListData;
}

export interface GetFavoriteListRequest extends Request {
  params: {
    code: string;
  };
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: unknown;
}

// Service response types
export type ServiceResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      statusCode: number;
    };
