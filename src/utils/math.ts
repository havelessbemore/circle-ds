/**
 * Restricts a value to a range defined by [min, max].
 *
 * @param value - the value to clamp.
 * @param min - the minimum range value.
 * @param max - the maximum range value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("Cannot clamp input; Range min must be <= max");
  }
  if (value <= min) {
    return min;
  }
  return value <= max ? value : max;
}

/**
 * Returns the logarithm with a given base of the input value.
 *
 * @param value - a numeric expression.
 * @param base - the logarithm's base.
 */
export function log(value: number, base: number): number {
  return value >= 0 && base > 0 ? Math.log(value) / Math.log(base) : NaN;
}
