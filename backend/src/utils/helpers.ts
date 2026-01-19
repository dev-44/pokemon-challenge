/**
 * Safely parse JSON string
 * @param jsonString - String to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
};

/**
 * Safely stringify object to JSON
 * @param obj - Object to stringify
 * @returns JSON string
 */
export const safeJsonStringify = (obj: unknown): string => {
  try {
    const result = JSON.stringify(obj);
    return result !== undefined ? result : '[]';
  } catch {
    return '[]';
  }
};

/**
 * Validate if value is a valid array of numbers
 * @param value - Value to validate
 * @returns true if valid array of numbers
 */
export const isValidNumberArray = (value: unknown): value is number[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'number' && !isNaN(item));
};

/**
 * Remove duplicates from array
 * @param arr - Array to deduplicate
 * @returns Array without duplicates
 */
export const removeDuplicates = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * Sleep function for async operations
 * @param ms - Milliseconds to sleep
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
