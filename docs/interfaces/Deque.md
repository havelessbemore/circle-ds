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

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Queue.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

Returns the default iterator through the queue's elements.

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[[iterator]](Stack.md#[iterator])

#### Defined in

[types/queue.d.ts:61](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L61)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Stack](Stack.md).[clear](Stack.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L24)

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

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L32)

___

### first

▸ **first**(): `undefined` \| `V`

Retrieves the first element added to the queue without removing it.

#### Returns

`undefined` \| `V`

The first element of the queue, or `undefined` if the queue is empty.

#### Inherited from

[Queue](Queue.md).[first](Queue.md#first)

#### Defined in

[types/queue.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L19)

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

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L41)

___

### front

▸ **front**(): `undefined` \| `V`

Retrieves the element at the front of the queue without removing it.

This method provides semantic clarity in contexts where the term "front" is
preferred over "first" to describe the element that was added earliest and will
be processed next.

#### Returns

`undefined` \| `V`

The element at the front of the queue, or `undefined` if the queue is empty.

#### Inherited from

[Queue](Queue.md).[front](Queue.md#front)

#### Defined in

[types/queue.d.ts:30](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L30)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a specific element exists within the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, `false` otherwise.

#### Inherited from

[Stack](Stack.md).[has](Stack.md#has)

#### Defined in

[types/queue.d.ts:39](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L39)

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

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L52)

___

### last

▸ **last**(): `undefined` \| `V`

Retrieves the last element added to the stack without removing it.

#### Returns

`undefined` \| `V`

The last element of the stack, or `undefined` if the stack is empty.

#### Inherited from

[Stack](Stack.md).[last](Stack.md#last)

#### Defined in

[types/stack.d.ts:28](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/stack.d.ts#L28)

___

### pop

▸ **pop**(): `undefined` \| `V`

Removes the last element added to the stack and returns it.

#### Returns

`undefined` \| `V`

The last element of the stack, or `undefined` if the stack is empty.

#### Inherited from

[Stack](Stack.md).[pop](Stack.md#pop)

#### Defined in

[types/stack.d.ts:35](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/stack.d.ts#L35)

___

### push

▸ **push**(`...values`): `number`

Adds one or more elements to the end of the queue
and returns the queue's new length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add. |

#### Returns

`number`

The new length of the queue.

#### Inherited from

[Stack](Stack.md).[push](Stack.md#push)

#### Defined in

[types/queue.d.ts:49](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L49)

___

### shift

▸ **shift**(): `undefined` \| `V`

Removes and returns the first element of the queue.

#### Returns

`undefined` \| `V`

The first element of the queue, or `undefined` if the queue is empty.

#### Inherited from

[Queue](Queue.md).[shift](Queue.md#shift)

#### Defined in

[types/queue.d.ts:56](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/queue.d.ts#L56)

___

### top

▸ **top**(): `undefined` \| `V`

Retrieves the element at the top of the stack without removing it.

This method provides semantic clarity in contexts where the term "top" is
preferred over "last" to describe the most recently added element.

#### Returns

`undefined` \| `V`

The element at the top of the stack, or `undefined` if the stack is empty.

#### Inherited from

[Stack](Stack.md).[top](Stack.md#top)

#### Defined in

[types/stack.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/stack.d.ts#L60)

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

The new length of the deque after the elements are added.

#### Defined in

[types/deque.d.ts:22](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/deque.d.ts#L22)

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

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/1533a70/src/types/collection.d.ts#L60)
