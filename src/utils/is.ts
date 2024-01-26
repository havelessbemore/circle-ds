// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIterable(value: any): value is Iterable<unknown> {
  return isFunction(value?.[Symbol.iterator]);
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}
