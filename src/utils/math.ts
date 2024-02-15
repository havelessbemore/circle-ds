/**
 * Returns the logarithm with a given base of the input value.
 *
 * @param value - a numeric expression.
 * @param base - the logarithm's base.
 */
export function log(value: number, base: number): number {
  return Math.log(value) / Math.log(base);
}
