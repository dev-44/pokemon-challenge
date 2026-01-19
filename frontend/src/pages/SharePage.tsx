import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFavorites } from "@/hooks";
import { Button } from "@/components";
import {
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Download,
  AlertCircle,
} from "lucide-react";
import { copyToClipboard, isValidCode } from "@/utils/helpers";

export const SharePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get code from URL params and initialize state directly
  const urlCode = searchParams.get("code");
  const [codeInput, setCodeInput] = useState(urlCode || "");
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState("");

  const { loadFromCode, loading, lastSavedCode } = useFavorites();

  const handleCopy = async () => {
    if (lastSavedCode) {
      const success = await copyToClipboard(lastSavedCode);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleLoadCode = async () => {
    setValidationError("");

    if (!codeInput.trim()) {
      setValidationError("Please enter a code");
      return;
    }

    if (!isValidCode(codeInput)) {
      setValidationError(
        "Invalid code format. Code must be exactly 8 characters (letters and numbers only)",
      );
      return;
    }

    const success = await loadFromCode(codeInput);
    if (success) {
      navigate("/favorites");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value.toUpperCase());
    setValidationError(""); // Clear error on input change
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Share2 className="h-16 w-16 mx-auto text-purple-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Share Your Favorites
        </h1>
        <p className="text-gray-600">
          Save your list and share it with friends, or load someone else's
          favorites!
        </p>
      </div>

      {/* Saved Code Section */}
      {lastSavedCode && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Saved Code
            </h2>
            <Check className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white rounded-lg p-4 font-mono text-2xl font-bold text-center text-gray-800 border-2 border-purple-300">
              {lastSavedCode}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCopy}
              className="min-w-[100px]"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <p className="text-sm text-gray-600">
            Share this code with friends so they can see your favorite Pokemon!
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-500 font-medium">
            OR
          </span>
        </div>
      </div>

      {/* Load Code Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Load Someone's Favorites
        </h2>

        <div className="space-y-3">
          <label
            htmlFor="code-input"
            className="block text-sm font-medium text-gray-700"
          >
            Enter a code to view their favorite Pokemon:
          </label>

          <div className="flex gap-2">
            <div className="flex-1">
              <input
                id="code-input"
                type="text"
                value={codeInput}
                onChange={handleInputChange}
                placeholder="ABC12345"
                maxLength={8}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none font-mono text-lg uppercase transition-colors ${
                  validationError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {validationError && (
                <p className="mt-2 text-sm text-red-600 flex items-start gap-1">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{validationError}</span>
                </p>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleLoadCode}
              disabled={!codeInput.trim() || loading}
              loading={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Load
                </>
              )}
            </Button>
          </div>

          {!validationError && (
            <p className="text-xs text-gray-500">
              Code must be exactly 8 characters (letters and numbers)
            </p>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💾 How to Save</h3>
          <p className="text-sm text-blue-800">
            Go to your Favorites page and click "Save & Share" to generate a
            unique code.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🔗 How to Load</h3>
          <p className="text-sm text-purple-800">
            Enter a friend's code above to view their favorite Pokemon list.
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center pt-4">
        <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};
