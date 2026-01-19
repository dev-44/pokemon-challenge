import { Pokemon } from "@/types/pokemon.types";

export const mockPokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  types: ["electric"],
  height: 4,
  weight: 60,
};

export const mockPokemonList: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
    height: 7,
    weight: 69,
  },
  {
    id: 4,
    name: "charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["fire"],
    height: 6,
    weight: 85,
  },
  {
    id: 7,
    name: "squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["water"],
    height: 5,
    weight: 90,
  },
];
