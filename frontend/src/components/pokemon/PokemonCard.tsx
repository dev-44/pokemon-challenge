import React from "react";
import { Star } from "lucide-react";
import type { Pokemon } from "@/types/pokemon.types";
import {
  formatPokemonName,
  formatPokemonId,
  getTypeColor,
} from "@/utils/helpers";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="group relative rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Favorite Star Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={`h-6 w-6 transition-colors ${
            isFavorite
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-400 hover:text-yellow-400"
          }`}
        />
      </button>

      {/* Pokemon Image */}
      <figure className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </figure>

      {/* Card Body */}
      <div className="p-6">
        {/* Pokemon ID */}
        <span className="text-sm font-mono font-bold text-gray-400">
          {formatPokemonId(pokemon.id)}
        </span>

        {/* Pokemon Name */}
        <h2 className="text-2xl font-bold capitalize mt-1 text-gray-800 group-hover:text-blue-600 transition-colors">
          {formatPokemonName(pokemon.name)}
        </h2>

        {/* Types */}
        <div className="flex flex-wrap gap-2 mt-3">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge ${getTypeColor(type)}`}>
              {type}
            </span>
          ))}
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Height:</span>{" "}
            {(pokemon.height / 10).toFixed(1)}m
          </div>
          <div>
            <span className="font-semibold">Weight:</span>{" "}
            {(pokemon.weight / 10).toFixed(1)}kg
          </div>
        </div>
      </div>
    </article>
  );
};
