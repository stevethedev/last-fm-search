/**
 * Cheap function for repeating `f` from `0..n`.
 */
export const repeat = <T>(n: number, f: EmptyIterator<T>): T[] => [...Array(n)].map((_, i) => f(i));

export type EmptyIterator<T> = (i: number) => T;

/**
 * Bound a number between two other numbers.
 */
export const bound = (value: number, min: number, max: number): number => (
  Math.min(max, Math.max(value, min))
);

/**
 * Generates a series of numbers starting at `start` and ending at `end - 1`
 */
export const range = (start: number, end: number): number[] => (
  end < start
    ? []
    : repeat(end - start, (i) => i + start)
);

export const flattenStyles = (obj: { [key: string]: boolean }): string => (
  Object.keys(obj).filter((key) => obj[key]).join(' ')
);
