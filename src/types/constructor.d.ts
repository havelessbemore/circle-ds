/**
 * Represents a type for constructor functions of objects of type `T`.
 *
 * This type is used to define a signature for classes or functions that can be
 * instantiated or called with the `new` operator, producing an instance of `T`.
 * The constructor can accept any number of arguments of any type, as indicated
 * by the `...args: unknown[]` parameter list, making this type flexible for
 * various usage scenarios.
 *
 * It is particularly useful in scenarios where generic programming is utilized,
 * and you need to reference a class or constructor function type directly,
 * such as when implementing factory functions, dependency injection containers,
 * or when working with higher-order components in frameworks that support
 * component class types.
 *
 * @param args - An array of arguments of any type that the constructor accepts.
 *
 * @returns An instance of type `T`, as produced by the constructor function.
 */
export type Constructor<T = object> = new (...args: unknown[]) => T;
