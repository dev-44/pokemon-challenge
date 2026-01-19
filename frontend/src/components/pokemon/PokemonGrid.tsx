import React from "react";
import { PokemonCard } from "./PokemonCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import type { Pokemon } from "@/types/pokemon.types";

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading?: boolean;
  favoriteIds: number[];
  onToggleFavorite: (pokemon: Pokemon) => void;
  emptyMessage?: string;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemon,
  loading = false,
  favoriteIds,
  onToggleFavorite,
  emptyMessage = "No Pokemon found",
}) => {
  if (loading && pokemon.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" message="Loading Pokemon..." />
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <p className="text-xl">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favoriteIds.includes(p.id)}
          onToggleFavorite={() => onToggleFavorite(p)}
        />
      ))}
    </div>
  );
};
