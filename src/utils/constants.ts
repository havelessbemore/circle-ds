/**
 * The maximum number of function arguments.
 *
 * In theory, arguments can be of any length.
 * In practice, implementations impose different limits.
 *
 * @see {@link https://262.ecma-international.org/14.0/#sec-list-and-record-specification-type | ECMAScript 2023}
 */
export const ARGS_MAX_LENGTH = 16383; // 2**14 - 1

/**
 * The maximum length of an array. The value is an unsigned 32-bit integer.
 *
 * @see {@link https://262.ecma-international.org/14.0/#sec-arraycreate | ECMAScript 2023}
 */
export const ARRAY_MAX_LENGTH = 4294967295; // 2**32 - 1;
