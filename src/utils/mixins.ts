import { Constructor } from "../types/constructor";

/**
 * Dynamically applies a series of mixin classes to a target class.
 *
 * Mixins are a way to add functionality to a class from multiple sources,
 * allowing for a form of multiple inheritance or trait composition. This
 * function copies the methods from each mixin's prototype onto
 * the target class's prototype, thereby "mixing in" behavior.
 *
 * This technique is useful for augmenting the capabilities of a class with
 * without using traditional inheritance. It promotes a more flexible and
 * composable approach to sharing functionality across classes.
 *
 * Please note that this approach does not copy instance properties, especially
 * those defined in the mixin's constructor or as class fields (with the
 * exception of getters and setters). This is because these properties do not
 * exist on the prototype, and instead are typically set on the object instance
 * itself when the constructor is called. If sharing properties is necessary,
 * consider composition or design patterns that explicitly encapsulate state.
 *
 * For more details, please see the
 * {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Handbook on Mixins}.
 *
 * @param target - The class to which the mixins will be applied.
 * @param mixins - An array of classes to apply to the target.
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
