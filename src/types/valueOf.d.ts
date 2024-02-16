/**
 *
 * `ValueOf<T>` creates a union type that represents all the possible types of values
 * that properties of `T` can hold. This is particularly useful when you need to
 * represent the type of any value that could be accessed from an object of type `T`,
 * regardless of the specific property.
 *
 * This type can be used in situations where you need to work with values from objects
 * dynamically, and you want to ensure type safety by capturing all the possible types
 * those values could be. It's also useful in generic programming when the specific
 * structure of an object is abstracted, but you still want to constrain or utilize the
 * types of its values.
 *
 * Example usage:
 * ```
 * type Example = { a: number; b: string; c: boolean };
 * type ValueOfExample = ValueOf<Example>; // Equivalent to number | string | boolean
 * ```
 *
 * @template T - The object type from which value types are extracted.
 */
export type ValueOf<T> = T[keyof T];
