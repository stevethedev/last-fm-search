/**
 * Cheap function for repeating `f` from `0..n`.
 */
export const repeat = <T>(n: number, f: (i: number) => T) => [...Array(n)].map((_, i) => f(i));
