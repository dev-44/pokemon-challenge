import { backendApiClient } from "./config";
import type {
  FavoriteListResponse,
  CreateFavoriteRequest,
  ApiError,
} from "@/types/pokemon.types";

/**
 * Backend API Service
 * Handles all interactions with our custom backend
 */
class BackendAPIService {
  /**
   * Save a list of favorite Pokemon
   * @param pokemonIds - Array of Pokemon IDs
   * @returns Response with unique code
   */
  async saveFavorites(
    pokemonIds: number[],
  ): Promise<FavoriteListResponse | ApiError> {
    try {
      const response = await backendApiClient.post<FavoriteListResponse>(
        "/favorites",
        { pokemonIds } as CreateFavoriteRequest,
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get favorites by unique code
   * @param code - Unique code for the favorites list
   * @returns Favorites list with Pokemon IDs
   */
  async getFavoritesByCode(
    code: string,
  ): Promise<FavoriteListResponse | ApiError> {
    try {
      const response = await backendApiClient.get<FavoriteListResponse>(
        `/favorites/${code}`,
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get all favorites lists (for admin/testing)
   * @returns All favorites lists
   */
  async getAllFavorites(): Promise<FavoriteListResponse[] | ApiError> {
    try {
      const response = await backendApiClient.get<{
        success: boolean;
        data: FavoriteListResponse["data"][];
      }>("/favorites");

      if (response.data.success) {
        return response.data.data.map((item) => ({
          success: true,
          data: item,
        }));
      }

      return {
        success: false,
        error: "Failed to fetch favorites",
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Check backend health
   * @returns Health status
   */
  async checkHealth(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await backendApiClient.get("/health");
      return response.data;
    } catch (_error) {
      return {
        success: false,
        message: "Backend is not available",
      };
    }
  }

  /**
   * Handle API errors
   * @param error - Error object
   * @returns Formatted error response
   */
  private handleError(error: unknown): ApiError {
    if (this.isAxiosError(error)) {
      // Backend validation error
      if (error.response?.status === 400) {
        return {
          success: false,
          error: error.response.data?.error || "Validation error",
        };
      }

      // Not found
      if (error.response?.status === 404) {
        return {
          success: false,
          error: error.response.data?.error || "Resource not found",
        };
      }

      // Rate limit
      if (error.response?.status === 429) {
        return {
          success: false,
          error: "Too many requests. Please try again later.",
        };
      }

      // Server error
      if (error.response?.status && error.response.status >= 500) {
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }

      // Network error
      if (error.message === "Network Error") {
        return {
          success: false,
          error: "Cannot connect to server. Please check your connection.",
        };
      }
    }

    // Unknown error
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }

  /**
   * Type guard for Axios errors
   */
  private isAxiosError(error: unknown): error is {
    response?: {
      status: number;
      data?: { error?: string };
    };
    message: string;
  } {
    return typeof error === "object" && error !== null && "message" in error;
  }
}

// Export singleton instance
export const backendAPI = new BackendAPIService();
