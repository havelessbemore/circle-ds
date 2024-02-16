[circle-ds](../README.md) / [Exports](../modules.md) / Deque

# Interface: Deque\<V\>

Represents a double-ended queue (deque) that supports queue and stack operations,
allowing elements to be added or removed from both the front and back of the collection.
This interface extends both the `Queue` and `Stack` interfaces to inherit
standard queue and stack behaviors, respectively, and introduces additional
functionality specific to deques.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Queue`](Queue.md)\<`V`\>

- [`Stack`](Stack.md)\<`V`\>

  ↳ **`Deque`**

## Implemented by

- [`CircularDeque`](../classes/CircularDeque.md)
- [`CircularLinkedDeque`](../classes/CircularLinkedDeque.md)

## Table of contents

### Accessors

- [[toStringTag]](Deque.md#[tostringtag])
- [size](Deque.md#size)

### Methods

- [[iterator]](Deque.md#[iterator])
- [clear](Deque.md#clear)
- [entries](Deque.md#entries)
- [first](Deque.md#first)
- [forEach](Deque.md#foreach)
- [front](Deque.md#front)
- [has](Deque.md#has)
- [keys](Deque.md#keys)
- [last](Deque.md#last)
- [pop](Deque.md#pop)
- [push](Deque.md#push)
- [shift](Deque.md#shift)
- [top](Deque.md#top)
- [unshift](Deque.md#unshift)
- [values](Deque.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Queue.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Queue.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[[iterator]](Stack.md#[iterator])

#### Defined in

[types/queue.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L9)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Stack](Stack.md).[clear](Stack.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L24)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `V`]\>

An iterable iterator for the entries of the collection.

#### Inherited from

[Stack](Stack.md).[entries](Stack.md#entries)

#### Defined in

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L32)

___

### first

▸ **first**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[first](Queue.md#first)

#### Defined in

[types/queue.d.ts:4](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L4)

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

[Stack](Stack.md).[forEach](Stack.md#foreach)

#### Defined in

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L41)

___

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[front](Queue.md#front)

#### Defined in

[types/queue.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L5)

___

### has

▸ **has**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`boolean`

#### Inherited from

[Stack](Stack.md).[has](Stack.md#has)

#### Defined in

[types/queue.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L6)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Inherited from

[Stack](Stack.md).[keys](Stack.md#keys)

#### Defined in

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L52)

___

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[last](Stack.md#last)

#### Defined in

[types/stack.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L5)

___

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[pop](Stack.md#pop)

#### Defined in

[types/stack.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L6)

___

### push

▸ **push**(`...values`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `V`[] |

#### Returns

`number`

#### Inherited from

[Stack](Stack.md).[push](Stack.md#push)

#### Defined in

[types/queue.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L7)

___

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[shift](Queue.md#shift)

#### Defined in

[types/queue.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/queue.d.ts#L8)

___

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[top](Stack.md#top)

#### Defined in

[types/stack.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L9)

___

### unshift

▸ **unshift**(`...values`): `number`

Adds one or more elements to the front of the deque and returns the new length.

This method allows for efficient front-end insertion, complementing the `push`
method inherited from the `Stack` interface for back-end insertion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add to the front of the deque. |

#### Returns

`number`

- The new length of the deque after the elements are added.

#### Defined in

[types/deque.d.ts:21](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/deque.d.ts#L21)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`V`\>

An iterable iterator for the values of the collection.

#### Inherited from

[Stack](Stack.md).[values](Stack.md#values)

#### Defined in

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L60)
