[circle-ds](../README.md) / [Exports](../modules.md) / CircularLinkedStack

# Class: CircularLinkedStack\<T\>

A circular stack is similar to a traditional stack, but uses a fixed-size,
circular buffer. When the stack reaches its maximum capacity and a new
element is added, the oldest is discarded, thus maintaining its size.

This structure efficiently utilizes memory for applications where only the
most recent additions are of interest and older data can be discarded.

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedStack.md#constructor)

### Accessors

- [[toStringTag]](CircularLinkedStack.md#[tostringtag])
- [capacity](CircularLinkedStack.md#capacity)
- [size](CircularLinkedStack.md#size)

### Methods

- [[iterator]](CircularLinkedStack.md#[iterator])
- [addListener](CircularLinkedStack.md#addlistener)
- [clear](CircularLinkedStack.md#clear)
- [entries](CircularLinkedStack.md#entries)
- [forEach](CircularLinkedStack.md#foreach)
- [has](CircularLinkedStack.md#has)
- [keys](CircularLinkedStack.md#keys)
- [last](CircularLinkedStack.md#last)
- [on](CircularLinkedStack.md#on)
- [pop](CircularLinkedStack.md#pop)
- [prependListener](CircularLinkedStack.md#prependlistener)
- [push](CircularLinkedStack.md#push)
- [removeListener](CircularLinkedStack.md#removelistener)
- [top](CircularLinkedStack.md#top)
- [values](CircularLinkedStack.md#values)

## Constructors

### constructor

• **new CircularLinkedStack**\<`T`\>(): [`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

Creates a new stack with `capacity` defaulted to `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

#### Defined in

[circle/circularLinkedStack.ts:24](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L24)

• **new CircularLinkedStack**\<`T`\>(`capacity?`): [`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

Creates a new stack with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the stack's capacity. |

#### Returns

[`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

#### Defined in

[circle/circularLinkedStack.ts:30](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L30)

• **new CircularLinkedStack**\<`T`\>(`items`): [`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

Creates a new stack. Initial capacity is the number of items given.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the values to store in the stack. |

#### Returns

[`CircularLinkedStack`](CircularLinkedStack.md)\<`T`\>

#### Defined in

[circle/circularLinkedStack.ts:36](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L36)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

Stack.[toStringTag]

#### Defined in

[circle/circularLinkedStack.ts:49](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L49)

___

### capacity

• `get` **capacity**(): `number`

Represents the maximum number of elements that the collection can hold. Once
capacity is reached, no additional elements can be added without removing
existing elements first. This is integral to the behavior of bounded collections,
providing a way to manage size.

1. Capacity should be a non-negative integer.

1. Implementers may choose to support dynamic capacity updates.

1. Implementers may choose to accept positive infinity (`Number.POSITIVE_INFINITY`) as
a valid capacity. This would effectively remove the upper limit on the collection size,
allowing it to grow unbounded. That said, size may still be constrained by the
implementation. For example, a simple array-based collection would be
limited to an array's maximum length (2^32 - 1 in JavaScript).

#### Returns

`number`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularLinkedStack.ts:41](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L41)

• `set` **capacity**(`capacity`): `void`

Represents the maximum number of elements that the collection can hold. Once
capacity is reached, no additional elements can be added without removing
existing elements first. This is integral to the behavior of bounded collections,
providing a way to manage size.

1. Capacity should be a non-negative integer.

1. Implementers may choose to support dynamic capacity updates.

1. Implementers may choose to accept positive infinity (`Number.POSITIVE_INFINITY`) as
a valid capacity. This would effectively remove the upper limit on the collection size,
allowing it to grow unbounded. That said, size may still be constrained by the
implementation. For example, a simple array-based collection would be
limited to an array's maximum length (2^32 - 1 in JavaScript).

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`void`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularLinkedStack.ts:53](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L53)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

Stack.size

#### Defined in

[circle/circularLinkedStack.ts:45](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L45)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the stack's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[Stack](../interfaces/Stack.md).[[iterator]](../interfaces/Stack.md#[iterator])

#### Defined in

[circle/circularLinkedStack.ts:92](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L92)

___

### addListener

▸ **addListener**(`event`, `listener`): `this`

Attaches a listener to the end of the listeners array for the specified event.
If the same listener is added multiple times for the same event, it will be invoked
multiple times when the event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event to listen for. Use `BoundedEvent.Overflow` for overflow-specific handling or other events as defined by the implementation. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to execute when the event occurs. For `BoundedEvent.Overflow`, it receives an array of elements removed due to overflow. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[addListener](../interfaces/Bounded.md#addlistener)

#### Defined in

[circle/circularLinkedStack.ts:104](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L104)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Defined in

[circle/circularLinkedStack.ts:57](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L57)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[entries](../interfaces/Stack.md#entries)

#### Defined in

[circle/circularLinkedStack.ts:61](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L61)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `T`, `index`: `number`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[forEach](../interfaces/Stack.md#foreach)

#### Defined in

[circle/circularLinkedStack.ts:65](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L65)

___

### has

▸ **has**(`value`): `boolean`

Determines whether an element exists within the stack.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, 'false' otherwise.

#### Implementation of

[Stack](../interfaces/Stack.md).[has](../interfaces/Stack.md#has)

#### Defined in

[circle/circularLinkedStack.ts:72](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L72)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[keys](../interfaces/Stack.md#keys)

#### Defined in

[circle/circularLinkedStack.ts:76](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L76)

___

### last

▸ **last**(): `undefined` \| `T`

Retrieves the last element added to the stack without removing it.

#### Returns

`undefined` \| `T`

The last element of the stack, or `undefined` if the stack is empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[last](../interfaces/Stack.md#last)

#### Defined in

[circle/circularLinkedStack.ts:80](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L80)

___

### on

▸ **on**(`event`, `listener`): `this`

An alias to `addListener`, providing a semantic way to register event listeners.
Follows the same behavior and signature as `addListener`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (`elems`: `T`[]) => `void` |

#### Returns

`this`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[on](../interfaces/Bounded.md#on)

#### Defined in

[circle/circularLinkedStack.ts:112](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L112)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the last element added to the stack and returns it.

#### Returns

`undefined` \| `T`

The last element of the stack, or `undefined` if the stack is empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[pop](../interfaces/Stack.md#pop)

#### Defined in

[circle/circularLinkedStack.ts:84](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L84)

___

### prependListener

▸ **prependListener**(`event`, `listener`): `this`

Adds the listener function to the beginning of the listeners array for the specified
event, ensuring that it is among the first to be called when the event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event to listen for. Use `BoundedEvent.Overflow` for overflow-specific handling or other events as defined by the implementation. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to execute when the event occurs. For `BoundedEvent.Overflow`, it receives an array of elements removed due to overflow. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[prependListener](../interfaces/Bounded.md#prependlistener)

#### Defined in

[circle/circularLinkedStack.ts:120](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L120)

___

### push

▸ **push**(`...elems`): `number`

Adds one or more elements to the end of the stack
and returns the stack's new length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | The elements to add. |

#### Returns

`number`

The new length of the stack.

#### Implementation of

[Stack](../interfaces/Stack.md).[push](../interfaces/Stack.md#push)

#### Defined in

[circle/circularLinkedStack.ts:88](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L88)

___

### removeListener

▸ **removeListener**(`event`, `listener`): `this`

Removes the specified listener from the listener array for the event.
Only one instance of the listener is removed per call. If the listener was
added multiple times for the same event, multiple calls are required to remove
each instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event from which to remove the listener. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to remove from the event's listeners array. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[removeListener](../interfaces/Bounded.md#removelistener)

#### Defined in

[circle/circularLinkedStack.ts:128](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L128)

___

### top

▸ **top**(): `undefined` \| `T`

Retrieves the element at the top of the stack without removing it.

This method provides semantic clarity in contexts where the term "top" is
preferred over "last" to describe the most recently added element.

#### Returns

`undefined` \| `T`

The element at the top of the stack, or `undefined` if the stack is empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[top](../interfaces/Stack.md#top)

#### Defined in

[circle/circularLinkedStack.ts:96](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L96)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[values](../interfaces/Stack.md#values)

#### Defined in

[circle/circularLinkedStack.ts:100](https://github.com/havelessbemore/circle-ds/blob/b2f0f90/src/circle/circularLinkedStack.ts#L100)
