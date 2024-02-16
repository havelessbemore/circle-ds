import { ARRAY_MAX_LENGTH } from "./constants";

/**
 * Checks if a given value is an integer within a valid array length range.
 *
 * This function is useful for validating array lengths before attempting operations
 * that could result in a `RangeError` due to invalid array size.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is an integer within the `[0, ARRAY_MAX_LENGTH]` range, `false` otherwise.
 */
export function isArrayLength(value: unknown): value is number {
  return (
    Number.isInteger(value) &&
    (value as number) >= 0 &&
    (value as number) <= ARRAY_MAX_LENGTH
  );
}

/**
 * Determines whether the provided value is a function.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a function, `false` otherwise.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * Checks if a given value is positive infinity.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is positive infinity, `false` otherwise.
 */
export function isInfinity(value: unknown): boolean {
  return value === Number.POSITIVE_INFINITY;
}

/**
 * Determines whether the provided value is iterable.
 *
 * This is useful for determining if a value can be used
 * in a `for...of` loop or with spread syntax.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value implements the iterable protocol, `false` otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(value: any): value is Iterable<unknown> {
  return typeof value?.[Symbol.iterator] === "function";
}

/**
 * Determines whether the provided value is a number.
 *
 * This includes `NaN` and `Infinity`, so consider additional
 * checks if those values are not desirable.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is of type number, `false` otherwise.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * Checks if a given value is a safe integer greater than or equal to 0.
 *
 * This is useful for validating counts or sizes that must be within the safe
 * integer range to prevent precision loss.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a safe integer and non-negative, `false` otherwise.
 */
export function isSafeCount(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}

/**
 * Determines whether the provided value is a symbol.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a symbol, `false` otherwise.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}
