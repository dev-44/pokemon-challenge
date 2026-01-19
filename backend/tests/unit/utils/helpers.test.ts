import {
  safeJsonParse,
  safeJsonStringify,
  isValidNumberArray,
  removeDuplicates,
  sleep,
} from '../../../src/utils/helpers';

describe('Helper Utils', () => {
  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse<number[]>('[1, 2, 3]', []);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return fallback on invalid JSON', () => {
      const fallback = [99];
      const result = safeJsonParse<number[]>('invalid json', fallback);
      expect(result).toEqual(fallback);
    });

    it('should handle empty strings', () => {
      const result = safeJsonParse<any>('', null);
      expect(result).toBeNull();
    });

    it('should parse complex objects', () => {
      const obj = { id: 1, name: 'test', items: [1, 2, 3] };
      const json = JSON.stringify(obj);
      const result = safeJsonParse<typeof obj>(json, {} as any);
      expect(result).toEqual(obj);
    });
  });

  describe('safeJsonStringify', () => {
    it('should stringify valid objects', () => {
      const result = safeJsonStringify([1, 2, 3]);
      expect(result).toBe('[1,2,3]');
    });

    it('should handle circular references', () => {
      const circular: any = { a: 1 };
      circular.self = circular;
      const result = safeJsonStringify(circular);
      expect(result).toBe('[]'); // Fallback
    });

    it('should stringify primitives', () => {
      expect(safeJsonStringify(123)).toBe('123');
      expect(safeJsonStringify('test')).toBe('"test"');
      expect(safeJsonStringify(true)).toBe('true');
    });

    it('should handle null and undefined', () => {
      expect(safeJsonStringify(null)).toBe('null');
      expect(safeJsonStringify(undefined)).toBe('[]'); // undefined converts to fallback
    });
  });

  describe('isValidNumberArray', () => {
    it('should validate valid number arrays', () => {
      expect(isValidNumberArray([1, 2, 3])).toBe(true);
      expect(isValidNumberArray([0])).toBe(true);
      expect(isValidNumberArray([-1, -2])).toBe(true);
      expect(isValidNumberArray([1.5, 2.7])).toBe(true);
    });

    it('should reject invalid arrays', () => {
      expect(isValidNumberArray(['1', '2'])).toBe(false);
      expect(isValidNumberArray([1, '2', 3])).toBe(false);
      expect(isValidNumberArray([1, null, 3])).toBe(false);
      expect(isValidNumberArray([1, undefined, 3])).toBe(false);
      expect(isValidNumberArray([1, NaN, 3])).toBe(false);
    });

    it('should reject non-arrays', () => {
      expect(isValidNumberArray(null as any)).toBe(false);
      expect(isValidNumberArray(undefined as any)).toBe(false);
      expect(isValidNumberArray('not an array' as any)).toBe(false);
      expect(isValidNumberArray(123 as any)).toBe(false);
      expect(isValidNumberArray({} as any)).toBe(false);
    });

    it('should accept empty arrays', () => {
      expect(isValidNumberArray([])).toBe(true);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate numbers', () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty arrays', () => {
      expect(removeDuplicates([])).toEqual([]);
    });

    it('should handle arrays with no duplicates', () => {
      expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should preserve order', () => {
      expect(removeDuplicates([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });
  });

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some variance
      expect(elapsed).toBeLessThan(150);
    });

    it('should return a promise', () => {
      const result = sleep(10);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
