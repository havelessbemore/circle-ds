/**
 * Restricts a given numerical value within a specified range [min, max].
 *
 * If the provided value is less than the minimum, the minimum is returned.
 * If it is greater than the maximum, the maximum is returned. If the value
 * is within the range, the value itself is returned. An error is thrown if
 * the minimum range value is greater than the maximum range value, as this
 * represents an invalid range.
 *
 * @param value - The numerical value to clamp.
 * @param min - The minimum allowable value of the range.
 * @param max - The maximum allowable value of the range.
 * @returns The clamped value within the specified range.
 * @throws {RangeError} If `min` is greater than `max`.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("Invalid clamp range; min must be <= max");
  }
  if (value <= min) {
    return min;
  }
  return value <= max ? value : max;
}

/**
 * Calculates the logarithm of a given value with the specified base.
 *
 * This function uses natural logarithms (`Math.log`) for its calculations.
 * If either the value or the base is less than or equal to 0, `NaN` is returned
 * to indicate an invalid operation, as logarithms are not defined for non-positive
 * values and bases.
 *
 * @param value - The numerical value for which to calculate the logarithm. Must be positive.
 * @param base - The base of the logarithm. Must be positive.
 * @returns The calculated logarithm of the value with the given base, or `NaN` for invalid inputs.
 */
export function log(value: number, base: number): number {
  return value >= 0 && base > 0 ? Math.log(value) / Math.log(base) : NaN;
}

/**
 * Attempts to convert a given value to an integer.
 *
 * The function first tries to convert the value to a number. If the result
 * is not valid (i.e. `NaN`), the given `defaultValue` is returned. Otherwise,
 * the function truncates the number to an integer using `Math.trunc`.
 *
 * This is useful for ensuring numerical operations are performed on integers,
 * with a controllable fallback for invalid inputs.
 *
 * @param value - The value to convert to an integer. This can be of any type.
 * @param defaultValue - The fallback value to return if conversion fails. Defaults to 0.
 * @returns The converted integer, or `defaultValue` if conversion is not possible.
 */
export function toInteger(value?: unknown, defaultValue = 0): number {
  value = +value!;
  return isNaN(value as number) ? defaultValue : Math.trunc(value as number);
}
