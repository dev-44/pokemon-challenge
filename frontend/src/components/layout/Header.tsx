import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, Home, Share2 } from "lucide-react";
import { useFavoritesStore } from "@/stores";

export const Header: React.FC = () => {
  const location = useLocation();

  // Subscribe to favorite count changes
  const favoriteCount = useFavoritesStore((state) => state.getFavoriteCount());

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pokemon-red via-pokemon-yellow to-pokemon-blue rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pokemon-red via-pokemon-yellow to-pokemon-blue bg-clip-text text-transparent">
              Pokédex Challenge
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive("/")
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all relative ${
                isActive("/favorites")
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Star className="h-5 w-5" />
              <span className="hidden sm:inline">Favorites</span>
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link
              to="/share"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive("/share")
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Share2 className="h-5 w-5" />
              <span className="hidden sm:inline">Share</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
