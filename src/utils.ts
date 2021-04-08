/**
 * Cheap function for repeating `f` from `0..n`.
 */
export const repeat = <T>(n: number, f: EmptyIterator<T>): T[] => [...Array(n)].map((_, i) => f(i));

export type EmptyIterator<T> = (i: number) => T;
