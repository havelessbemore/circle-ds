/**
 * Represents the maximum number of arguments that can be passed to a function.
 *
 * While ECMAScript specifications do not explicitly limit the number of function arguments,
 * practical limits are imposed by JavaScript engine implementations. Different engines can
 * have different maximums, so a conservative value is used to prevent runtime errors.
 *
 * For more details, see the
 * {@link https://262.ecma-international.org/14.0/#sec-list-and-record-specification-type | ECMAScript Specification},
 * section "6.2.2 The List and Record Specification Types".
 */
export const ARGS_MAX_LENGTH = 16383; // 2**14 - 1

/**
 * Defines the maximum allowable length of an array.
 *
 * According to the ECMAScript specification, the length property of an array is
 * an unsigned 32-bit integer, so its range is 0 to 2**32 - 1, inclusive. Beyond this,
 * operations that modify the array length (e.g., `push`, `pop`, `unshift`, `shift`)
 * may fail or behave unexpectedly.
 *
 * For more details, see the
 * {@link https://262.ecma-international.org/14.0/#sec-arraycreate | ECMAScript Specification},
 * section "10.4.2.2 ArrayCreate".
 */
export const ARRAY_MAX_LENGTH = 4294967295; // 2**32 - 1;
