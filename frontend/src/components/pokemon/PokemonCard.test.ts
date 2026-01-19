import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPokemon } from "@/test/mockData";
import { createElement } from "react";
import * as PokemonCardModule from "./PokemonCard";

describe("PokemonCard Component", () => {
  it("renders Pokemon information", () => {
    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: mockPokemon,
        isFavorite: false,
        onToggleFavorite: () => {},
      }),
    );

    expect(screen.getByText(/#025/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  it("displays Pokemon image", () => {
    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: mockPokemon,
        isFavorite: false,
        onToggleFavorite: () => {},
      }),
    );

    const img = screen.getByAltText("pikachu");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPokemon.image);
  });

  it("shows multiple types", () => {
    const dualTypePokemon = {
      ...mockPokemon,
      types: ["grass", "poison"],
    };

    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: dualTypePokemon,
        isFavorite: false,
        onToggleFavorite: () => {},
      }),
    );

    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
  });

  it("shows filled star when favorite", () => {
    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: mockPokemon,
        isFavorite: true,
        onToggleFavorite: () => {},
      }),
    );

    const starButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(starButton).toBeInTheDocument();
  });

  it("shows empty star when not favorite", () => {
    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: mockPokemon,
        isFavorite: false,
        onToggleFavorite: () => {},
      }),
    );

    const starButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    expect(starButton).toBeInTheDocument();
  });

  it("calls onToggleFavorite when star is clicked", async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(
      createElement(PokemonCardModule.PokemonCard, {
        pokemon: mockPokemon,
        isFavorite: false,
        onToggleFavorite: handleToggle,
      }),
    );

    const starButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    await user.click(starButton);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith();
  });
});
