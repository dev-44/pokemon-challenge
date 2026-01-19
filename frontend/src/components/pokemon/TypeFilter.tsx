import React from "react";
import { getTypeColor } from "@/utils/helpers";

interface TypeFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTypeChange(null)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
          selectedType === null
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Types
      </button>

      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`type-badge capitalize transition-all ${
            selectedType === type
              ? getTypeColor(type) + " shadow-md ring-2 ring-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
