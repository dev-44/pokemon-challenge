import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  capitalize,
  formatPokemonName,
  formatPokemonId,
  formatHeight,
  formatWeight,
  getPokemonIdFromUrl,
  getTypeColor,
  isValidCode,
  debounce,
  copyToClipboard,
  sleep,
  chunk,
} from "./helpers";

describe("String Formatting", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("WORLD")).toBe("WORLD");
    expect(capitalize("")).toBe("");
  });

  it("formats Pokemon names correctly", () => {
    expect(formatPokemonName("pikachu")).toBe("Pikachu");
    expect(formatPokemonName("mr-mime")).toBe("Mr Mime");
    expect(formatPokemonName("farfetchd")).toBe("Farfetchd");
  });

  it("formats Pokemon ID with leading zeros", () => {
    expect(formatPokemonId(1)).toBe("#001");
    expect(formatPokemonId(25)).toBe("#025");
    expect(formatPokemonId(150)).toBe("#150");
    expect(formatPokemonId(1000)).toBe("#1000");
  });
});

describe("Pokemon Data Formatting", () => {
  it("formats height from decimeters to meters", () => {
    expect(formatHeight(10)).toBe("1.0 m");
    expect(formatHeight(7)).toBe("0.7 m");
    expect(formatHeight(15)).toBe("1.5 m");
  });

  it("formats weight from hectograms to kilograms", () => {
    expect(formatWeight(69)).toBe("6.9 kg");
    expect(formatWeight(100)).toBe("10.0 kg");
    expect(formatWeight(5)).toBe("0.5 kg");
  });
});

describe("URL Parsing", () => {
  it("extracts Pokemon ID from API URL", () => {
    expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(
      25,
    );
    expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon/150/")).toBe(
      150,
    );
  });

  it("returns 0 for invalid URLs", () => {
    expect(getPokemonIdFromUrl("invalid-url")).toBe(0);
    expect(getPokemonIdFromUrl("")).toBe(0);
  });
});

describe("Type Colors", () => {
  it("returns correct Tailwind classes for types", () => {
    expect(getTypeColor("fire")).toBe("bg-type-fire text-white");
    expect(getTypeColor("water")).toBe("bg-type-water text-white");
    expect(getTypeColor("grass")).toBe("bg-type-grass text-white");
  });

  it("returns default color for unknown type", () => {
    expect(getTypeColor("unknown")).toBe("bg-gray-500 text-white");
  });
});

describe("Code Validation", () => {
  it("validates correct codes", () => {
    expect(isValidCode("ABC12345")).toBe(true);
    expect(isValidCode("12345678")).toBe(true);
    expect(isValidCode("ABCDEFGH")).toBe(true);
  });

  it("rejects invalid codes", () => {
    expect(isValidCode("ABC123")).toBe(false); // too short
    expect(isValidCode("ABC1234567")).toBe(false); // too long
    expect(isValidCode("ABC-1234")).toBe(false); // special chars
    expect(isValidCode("")).toBe(false); // empty
  });
});

describe("Debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debounces function calls", () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 300);

    debouncedFunc("call1");
    debouncedFunc("call2");
    debouncedFunc("call3");

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("call3");
  });
});

describe("Clipboard", () => {
  it("copies text to clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const result = await copyToClipboard("test text");

    expect(result).toBe(true);
    expect(writeText).toHaveBeenCalledWith("test text");
  });

  it("returns false on clipboard error", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Failed"));
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const result = await copyToClipboard("test");

    expect(result).toBe(false);
  });
});

describe("Utilities", () => {
  it("sleep delays execution", async () => {
    // CORREGIDO: Usar fake timers para hacer el test instantáneo
    vi.useFakeTimers();

    let resolved = false;
    const sleepPromise = sleep(100).then(() => {
      resolved = true;
    });

    // No debería estar resuelto aún
    expect(resolved).toBe(false);

    // Avanzar el tiempo 100ms
    await vi.advanceTimersByTimeAsync(100);

    // Esperar a que se resuelva
    await sleepPromise;

    // Ahora debería estar resuelto
    expect(resolved).toBe(true);

    vi.useRealTimers();
  });

  it("chunks array into smaller arrays", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    expect(chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
    expect(chunk([], 2)).toEqual([]);
  });
});
