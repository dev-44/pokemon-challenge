import { customAlphabet } from "nanoid";
import { config } from "@/config/environment";

// Create a custom alphabet without ambiguous characters (0, O, I, l, etc.)
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const nanoid = customAlphabet(ALPHABET, config.uniqueCodeLength);

/**
 * Generates a unique, URL-safe code
 * @returns A unique code string
 */
export const generateUniqueCode = (): string => {
  return nanoid();
};

/**
 * Validates if a code matches the expected format
 * @param code - The code to validate
 * @returns true if valid, false otherwise
 */
export const isValidCode = (code: string): boolean => {
  if (!code || typeof code !== "string") {
    return false;
  }

  if (code.length !== config.uniqueCodeLength) {
    return false;
  }

  // Check if all characters are from our alphabet
  return [...code].every((char) => ALPHABET.includes(char));
};
