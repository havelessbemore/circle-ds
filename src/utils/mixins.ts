import { Constructor } from "../types/constructor";

/**
 * Applies mixins to a target class.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/mixins.html | Typescript Handbook}
 *
 * @param target - the target class.
 * @param mixins - the mixins to apply to the target class.
 */
export function applyMixins(target: Constructor, mixins: Constructor[]): void {
  for (const mixin of mixins) {
    const proto = mixin.prototype;
    for (const name of Object.getOwnPropertyNames(proto)) {
      const descriptor =
        Object.getOwnPropertyDescriptor(proto, name) ?? Object.create(null);
      Object.defineProperty(target.prototype, name, descriptor);
    }
  }
}
