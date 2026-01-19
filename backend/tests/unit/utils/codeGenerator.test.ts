import { generateUniqueCode, isValidCode } from '../../../src/utils/codeGenerator';

describe('Code Generator Utils', () => {
  describe('generateUniqueCode', () => {
    it('should generate a code of correct length', () => {
      const code = generateUniqueCode();
      expect(code).toHaveLength(8);
    });

    it('should generate unique codes', () => {
      const code1 = generateUniqueCode();
      const code2 = generateUniqueCode();
      const code3 = generateUniqueCode();

      expect(code1).not.toBe(code2);
      expect(code2).not.toBe(code3);
      expect(code1).not.toBe(code3);
    });

    it('should generate codes with only allowed characters', () => {
      const allowedChars = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;

      for (let i = 0; i < 100; i++) {
        const code = generateUniqueCode();
        expect(code).toMatch(allowedChars);
      }
    });

    it('should not contain ambiguous characters', () => {
      const ambiguousChars = ['0', 'O', 'I', 'l'];

      for (let i = 0; i < 100; i++) {
        const code = generateUniqueCode();
        ambiguousChars.forEach(char => {
          expect(code).not.toContain(char);
        });
      }
    });
  });

  describe('isValidCode', () => {
    it('should validate correct codes', () => {
      const validCodes = ['ABC12345', 'Xy3K9mN2', 'AAAAAAAA', '12345678'];

      validCodes.forEach(code => {
        expect(isValidCode(code)).toBe(true);
      });
    });

    it('should reject codes with wrong length', () => {
      expect(isValidCode('ABC123')).toBe(false); // Too short
      expect(isValidCode('ABC1234567')).toBe(false); // Too long
    });

    it('should reject codes with invalid characters', () => {
      expect(isValidCode('ABC123O0')).toBe(false); // Contains O and 0
      expect(isValidCode('ABC123Il')).toBe(false); // Contains I and l
      expect(isValidCode('ABC123-4')).toBe(false); // Contains -
      expect(isValidCode('ABC123_4')).toBe(false); // Contains _
    });

    it('should reject non-string values', () => {
      expect(isValidCode(null as any)).toBe(false);
      expect(isValidCode(undefined as any)).toBe(false);
      expect(isValidCode(123 as any)).toBe(false);
      expect(isValidCode({} as any)).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(isValidCode('')).toBe(false);
    });
  });
});
