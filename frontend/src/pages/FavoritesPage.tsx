import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks";
import { PokemonGrid, Button, Modal } from "@/components";
import { Star, Trash2, Save, ArrowLeft } from "lucide-react";

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);

  const {
    favorites,
    favoriteCount,
    favoriteIds,
    toggleFavorite,
    clearFavorites,
    saveFavorites,
    saving,
  } = useFavorites();

  const handleSave = async () => {
    const code = await saveFavorites();
    if (code) {
      // Navigate to share page with the code
      navigate(`/share?code=${code}`);
    }
  };

  const handleClearConfirm = () => {
    clearFavorites();
    setShowClearModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="md" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              My Favorites
            </h1>
            <p className="text-gray-600 mt-1">
              {favoriteCount === 0
                ? "No favorites yet. Start adding Pokemon!"
                : `${favoriteCount} / 50 Pokemon`}
            </p>
          </div>
        </div>

        {/* Actions */}
        {favoriteCount > 0 && (
          <div className="flex gap-2">
            <Button
              variant="danger"
              size="md"
              onClick={() => setShowClearModal(true)}
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear All
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              loading={saving}
            >
              <Save className="h-5 w-5 mr-2" />
              Save & Share
            </Button>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearConfirm}
        title="Clear All Favorites?"
        message={`Are you sure you want to remove all ${favoriteCount} Pokemon from your favorites? This action cannot be undone.`}
        confirmText="Clear All"
        cancelText="Cancel"
        type="confirm"
      />

      {/* Empty State */}
      {favoriteCount === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <Star className="h-24 w-24 text-gray-300" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-700">
              No Favorites Yet
            </h2>
            <p className="text-gray-600 max-w-md">
              Start exploring Pokemon and click the star icon to add them to
              your favorites!
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={() => navigate("/")}>
            Explore Pokemon
          </Button>
        </div>
      )}

      {/* Favorites Grid */}
      {favoriteCount > 0 && (
        <>
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> You can save up to 50 Pokemon. Click
              "Save & Share" to get a unique code to share your list with
              friends!
            </p>
          </div>

          {/* Grid */}
          <PokemonGrid
            pokemon={favorites}
            loading={false}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />

          {/* Bottom Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              loading={saving}
            >
              <Save className="h-5 w-5 mr-2" />
              Save & Share
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
