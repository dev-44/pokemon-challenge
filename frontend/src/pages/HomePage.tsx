import React, { useState, useCallback } from "react";
import {
  usePokemonList,
  usePokemonSearch,
  usePokemonByType,
  useFavorites,
} from "@/hooks";
import {
  PokemonGrid,
  SearchBar,
  TypeFilter,
  Button,
  LoadingSpinner,
} from "@/components";
import { ChevronDown } from "lucide-react";

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Hooks
  const {
    pokemon: allPokemon,
    loading: loadingAll,
    hasMore,
    loadMore,
  } = usePokemonList(20);
  const {
    results: searchResults,
    loading: loadingSearch,
    search,
  } = usePokemonSearch();
  const { pokemon: typeFiltered, loading: loadingType } =
    usePokemonByType(selectedType);
  const { favoriteIds, toggleFavorite } = useFavorites();

  // Determine which pokemon list to show
  const getPokemonToDisplay = () => {
    if (searchQuery) return searchResults;
    if (selectedType) return typeFiltered;
    return allPokemon;
  };

  const pokemonToDisplay = getPokemonToDisplay();
  const isLoading = loadingAll || loadingSearch || loadingType;

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query) {
        setSelectedType(null); // Clear type filter when searching
        search(query);
      }
    },
    [search],
  );

  // Handle type filter
  const handleTypeChange = useCallback((type: string | null) => {
    setSelectedType(type);
    setSearchQuery(""); // Clear search when filtering by type
  }, []);

  // Handle load more
  const handleLoadMore = () => {
    if (!isLoading && hasMore && !searchQuery && !selectedType) {
      loadMore();
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Gotta Catch 'Em All!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore all Pokemon, search by name, filter by type, and save your
          favorites!
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search Pokemon by name..."
        />
      </div>

      {/* Type Filter */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">Filter by Type:</h2>
        <TypeFilter
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {searchQuery && `Search results for "${searchQuery}"`}
          {selectedType && `Showing ${selectedType} type Pokemon`}
          {!searchQuery && !selectedType && `Showing all Pokemon`}
        </p>
        <p className="text-sm font-semibold text-gray-700">
          {pokemonToDisplay.length} Pokemon found
        </p>
      </div>

      {/* Pokemon Grid */}
      <PokemonGrid
        pokemon={pokemonToDisplay}
        loading={isLoading && pokemonToDisplay.length === 0}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        emptyMessage={
          searchQuery
            ? `No Pokemon found matching "${searchQuery}"`
            : selectedType
              ? `No ${selectedType} type Pokemon found`
              : "No Pokemon available"
        }
      />

      {/* Load More Button */}
      {!searchQuery &&
        !selectedType &&
        hasMore &&
        pokemonToDisplay.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleLoadMore}
              loading={isLoading}
              variant="primary"
              size="lg"
              className="min-w-[200px]"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Load More
                  <ChevronDown className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}

      {/* Loading indicator for load more */}
      {isLoading && pokemonToDisplay.length > 0 && (
        <div className="flex justify-center py-4">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  );
};
