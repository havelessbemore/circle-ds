[circle-ds](../README.md) / [Exports](../modules.md) / CircularLinkedDeque

# Class: CircularLinkedDeque\<T\>

A circular deque is similar to a traditional deque, but uses a fixed-size,
circular buffer. When the deque reaches its maximum capacity and a new
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
- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedDeque.md#constructor)

### Accessors

- [[toStringTag]](CircularLinkedDeque.md#[tostringtag])
- [capacity](CircularLinkedDeque.md#capacity)
- [size](CircularLinkedDeque.md#size)

### Methods

- [[iterator]](CircularLinkedDeque.md#[iterator])
- [addListener](CircularLinkedDeque.md#addlistener)
- [clear](CircularLinkedDeque.md#clear)
- [entries](CircularLinkedDeque.md#entries)
- [first](CircularLinkedDeque.md#first)
- [forEach](CircularLinkedDeque.md#foreach)
- [front](CircularLinkedDeque.md#front)
- [has](CircularLinkedDeque.md#has)
- [keys](CircularLinkedDeque.md#keys)
- [last](CircularLinkedDeque.md#last)
- [on](CircularLinkedDeque.md#on)
- [pop](CircularLinkedDeque.md#pop)
- [push](CircularLinkedDeque.md#push)
- [removeListener](CircularLinkedDeque.md#removelistener)
- [shift](CircularLinkedDeque.md#shift)
- [top](CircularLinkedDeque.md#top)
- [unshift](CircularLinkedDeque.md#unshift)
- [values](CircularLinkedDeque.md#values)

## Constructors

### constructor

• **new CircularLinkedDeque**\<`T`\>(): [`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

Creates a new stack with `capacity` defaulted to `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

#### Defined in

[collections/deque/circularLinkedDeque.ts:26](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L26)

• **new CircularLinkedDeque**\<`T`\>(`capacity?`): [`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

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

[`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

#### Defined in

[collections/deque/circularLinkedDeque.ts:32](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L32)

• **new CircularLinkedDeque**\<`T`\>(`items`): [`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

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

[`CircularLinkedDeque`](CircularLinkedDeque.md)\<`T`\>

#### Defined in

[collections/deque/circularLinkedDeque.ts:38](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L38)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

Deque.[toStringTag]

#### Defined in

[collections/deque/circularLinkedDeque.ts:51](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L51)

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

[collections/deque/circularLinkedDeque.ts:43](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L43)

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

[collections/deque/circularLinkedDeque.ts:55](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L55)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

Deque.size

#### Defined in

[collections/deque/circularLinkedDeque.ts:47](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L47)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the queue's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[Deque](../interfaces/Deque.md).[[iterator]](../interfaces/Deque.md#[iterator])

#### Defined in

[collections/deque/circularLinkedDeque.ts:106](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L106)

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

[collections/deque/circularLinkedDeque.ts:122](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L122)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Defined in

[collections/deque/circularLinkedDeque.ts:67](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L67)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Implementation of

[Deque](../interfaces/Deque.md).[entries](../interfaces/Deque.md#entries)

#### Defined in

[collections/deque/circularLinkedDeque.ts:71](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L71)

___

### first

▸ **first**(): `undefined` \| `T`

Retrieves the first element added to the queue without removing it.

#### Returns

`undefined` \| `T`

The first element of the queue, or `undefined` if the queue is empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[first](../interfaces/Deque.md#first)

#### Defined in

[collections/deque/circularLinkedDeque.ts:59](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L59)

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

[Deque](../interfaces/Deque.md).[forEach](../interfaces/Deque.md#foreach)

#### Defined in

[collections/deque/circularLinkedDeque.ts:75](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L75)

___

### front

▸ **front**(): `undefined` \| `T`

Retrieves the element at the front of the queue without removing it.

This method provides semantic clarity in contexts where the term "front" is
preferred over "first" to describe the element that was added earliest and will
be processed next.

#### Returns

`undefined` \| `T`

The element at the front of the queue, or `undefined` if the queue is empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[front](../interfaces/Deque.md#front)

#### Defined in

[collections/deque/circularLinkedDeque.ts:63](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L63)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a specific element exists within the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, `false` otherwise.

#### Implementation of

[Deque](../interfaces/Deque.md).[has](../interfaces/Deque.md#has)

#### Defined in

[collections/deque/circularLinkedDeque.ts:82](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L82)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Implementation of

[Deque](../interfaces/Deque.md).[keys](../interfaces/Deque.md#keys)

#### Defined in

[collections/deque/circularLinkedDeque.ts:86](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L86)

___

### last

▸ **last**(): `undefined` \| `T`

Retrieves the last element added to the stack without removing it.

#### Returns

`undefined` \| `T`

The last element of the stack, or `undefined` if the stack is empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[last](../interfaces/Deque.md#last)

#### Defined in

[collections/deque/circularLinkedDeque.ts:90](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L90)

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

[collections/deque/circularLinkedDeque.ts:130](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L130)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the last element added to the stack and returns it.

#### Returns

`undefined` \| `T`

The last element of the stack, or `undefined` if the stack is empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[pop](../interfaces/Deque.md#pop)

#### Defined in

[collections/deque/circularLinkedDeque.ts:94](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L94)

___

### push

▸ **push**(`...elems`): `number`

Adds one or more elements to the end of the queue
and returns the queue's new length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | The elements to add. |

#### Returns

`number`

The new length of the queue.

#### Implementation of

[Deque](../interfaces/Deque.md).[push](../interfaces/Deque.md#push)

#### Defined in

[collections/deque/circularLinkedDeque.ts:98](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L98)

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

[collections/deque/circularLinkedDeque.ts:138](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L138)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the queue.

#### Returns

`undefined` \| `T`

The first element of the queue, or `undefined` if the queue is empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[shift](../interfaces/Deque.md#shift)

#### Defined in

[collections/deque/circularLinkedDeque.ts:102](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L102)

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

[Deque](../interfaces/Deque.md).[top](../interfaces/Deque.md#top)

#### Defined in

[collections/deque/circularLinkedDeque.ts:110](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L110)

___

### unshift

▸ **unshift**(`...elems`): `number`

Adds one or more elements to the front of the deque and returns the new length.

This method allows for efficient front-end insertion, complementing the `push`
method inherited from the `Stack` interface for back-end insertion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | The elements to add to the front of the deque. |

#### Returns

`number`

The new length of the deque after the elements are added.

#### Implementation of

[Deque](../interfaces/Deque.md).[unshift](../interfaces/Deque.md#unshift)

#### Defined in

[collections/deque/circularLinkedDeque.ts:114](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L114)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Implementation of

[Deque](../interfaces/Deque.md).[values](../interfaces/Deque.md#values)

#### Defined in

[collections/deque/circularLinkedDeque.ts:118](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/deque/circularLinkedDeque.ts#L118)
