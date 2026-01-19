/**
 * Utility functions for the application
 */

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format Pokemon name (remove hyphens, capitalize)
 */
export const formatPokemonName = (name: string): string => {
  return name.split("-").map(capitalize).join(" ");
};

/**
 * Get Pokemon ID from URL
 */
export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  const id = parseInt(parts[parts.length - 1], 10);
  return isNaN(id) ? 0 : id;
};

/**
 * Format Pokemon ID with leading zeros
 */
export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, "0")}`;
};

/**
 * Debounce function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get type color for badges
 */
export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: "bg-type-normal text-white",
    fire: "bg-type-fire text-white",
    water: "bg-type-water text-white",
    electric: "bg-type-electric text-gray-900",
    grass: "bg-type-grass text-white",
    ice: "bg-type-ice text-gray-900",
    fighting: "bg-type-fighting text-white",
    poison: "bg-type-poison text-white",
    ground: "bg-type-ground text-white",
    flying: "bg-type-flying text-white",
    psychic: "bg-type-psychic text-white",
    bug: "bg-type-bug text-white",
    rock: "bg-type-rock text-white",
    ghost: "bg-type-ghost text-white",
    dragon: "bg-type-dragon text-white",
    dark: "bg-type-dark text-white",
    steel: "bg-type-steel text-gray-900",
    fairy: "bg-type-fairy text-white",
  };

  return colors[type] || "bg-gray-500 text-white";
};

/**
 * Validate Pokemon code format
 */
export const isValidCode = (code: string): boolean => {
  // 8 characters, alphanumeric, no ambiguous characters (0, O, I, l)
  const regex =
    /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}$/;
  return regex.test(code);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
};

/**
 * Format height (decimeters to meters)
 */
export const formatHeight = (heightInDecimeters: number): string => {
  const meters = heightInDecimeters / 10;
  return `${meters.toFixed(1)} m`;
};

/**
 * Format weight (hectograms to kilograms)
 */
export const formatWeight = (weightInHectograms: number): string => {
  const kilograms = weightInHectograms / 10;
  return `${kilograms.toFixed(1)} kg`;
};

/**
 * Sleep function for testing/delays
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
};
