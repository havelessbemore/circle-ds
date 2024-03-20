[circle-ds](../README.md) / [Exports](../modules.md) / Stack

# Interface: Stack\<V\>

Represents a stack collection of elements. A stack allows elements to be
added and removed from the end of the collection only, following the
LIFO (Last In, First Out) principle. This interface extends the `Collection`
interface and specifies additional stack-specific operations.

Stacks are commonly used in scenarios where you need to temporarily store and
retrieve elements in a reverse order of their addition, such as in
undo mechanisms, parsing algorithms, and temporary buffers.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`Stack`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularLinkedStack`](../classes/CircularLinkedStack.md)
- [`CircularStack`](../classes/CircularStack.md)

## Table of contents

### Accessors

- [[toStringTag]](Stack.md#[tostringtag])
- [size](Stack.md#size)

### Methods

- [[iterator]](Stack.md#[iterator])
- [clear](Stack.md#clear)
- [entries](Stack.md#entries)
- [forEach](Stack.md#foreach)
- [has](Stack.md#has)
- [keys](Stack.md#keys)
- [last](Stack.md#last)
- [pop](Stack.md#pop)
- [push](Stack.md#push)
- [top](Stack.md#top)
- [values](Stack.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

Returns the default iterator through the stack's elements.

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/stack.d.ts:50](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L50)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L24)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `V`]\>

An iterable iterator for the entries of the collection.

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L32)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `number`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[forEach](Collection.md#foreach)

#### Defined in

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L41)

___

### has

▸ **has**(`value`): `boolean`

Determines whether an element exists within the stack.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, 'false' otherwise.

#### Defined in

[types/stack.d.ts:21](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L21)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L52)

___

### last

▸ **last**(): `undefined` \| `V`

Retrieves the last element added to the stack without removing it.

#### Returns

`undefined` \| `V`

The last element of the stack, or `undefined` if the stack is empty.

#### Defined in

[types/stack.d.ts:28](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L28)

___

### pop

▸ **pop**(): `undefined` \| `V`

Removes the last element added to the stack and returns it.

#### Returns

`undefined` \| `V`

The last element of the stack, or `undefined` if the stack is empty.

#### Defined in

[types/stack.d.ts:35](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L35)

___

### push

▸ **push**(`...values`): `number`

Adds one or more elements to the end of the stack
and returns the stack's new length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add. |

#### Returns

`number`

The new length of the stack.

#### Defined in

[types/stack.d.ts:45](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L45)

___

### top

▸ **top**(): `undefined` \| `V`

Retrieves the element at the top of the stack without removing it.

This method provides semantic clarity in contexts where the term "top" is
preferred over "last" to describe the most recently added element.

#### Returns

`undefined` \| `V`

The element at the top of the stack, or `undefined` if the stack is empty.

#### Defined in

[types/stack.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/stack.d.ts#L60)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`V`\>

An iterable iterator for the values of the collection.

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/types/collection.d.ts#L60)
