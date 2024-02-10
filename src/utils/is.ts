import { ARRAY_MAX_LENGTH } from "./constants";

export function isArrayLength(value: unknown): value is number {
  return (
    Number.isInteger(value) &&
    (value as number) >= 0 &&
    (value as number) <= ARRAY_MAX_LENGTH
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

export function isInfinity(value: unknown): boolean {
  return value === Number.POSITIVE_INFINITY;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(value: any): value is Iterable<unknown> {
  return typeof value?.[Symbol.iterator] === "function";
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isSafeCount(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}
