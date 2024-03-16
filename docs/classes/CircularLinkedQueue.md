[circle-ds](../README.md) / [Exports](../modules.md) / CircularLinkedQueue

# Class: CircularLinkedQueue\<T\>

A circular queue is similar to a traditional queue, but uses a fixed-size,
circular buffer. When the queue reaches its maximum capacity and a new
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
- [`Queue`](../interfaces/Queue.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedQueue.md#constructor)

### Accessors

- [[toStringTag]](CircularLinkedQueue.md#[tostringtag])
- [capacity](CircularLinkedQueue.md#capacity)
- [size](CircularLinkedQueue.md#size)

### Methods

- [[iterator]](CircularLinkedQueue.md#[iterator])
- [addListener](CircularLinkedQueue.md#addlistener)
- [clear](CircularLinkedQueue.md#clear)
- [entries](CircularLinkedQueue.md#entries)
- [first](CircularLinkedQueue.md#first)
- [forEach](CircularLinkedQueue.md#foreach)
- [front](CircularLinkedQueue.md#front)
- [has](CircularLinkedQueue.md#has)
- [keys](CircularLinkedQueue.md#keys)
- [on](CircularLinkedQueue.md#on)
- [prependListener](CircularLinkedQueue.md#prependlistener)
- [push](CircularLinkedQueue.md#push)
- [removeListener](CircularLinkedQueue.md#removelistener)
- [shift](CircularLinkedQueue.md#shift)
- [values](CircularLinkedQueue.md#values)

## Constructors

### constructor

• **new CircularLinkedQueue**\<`T`\>(): [`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

Creates a new stack with `capacity` defaulted to `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

#### Defined in

[circle/circularLinkedQueue.ts:26](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L26)

• **new CircularLinkedQueue**\<`T`\>(`capacity?`): [`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

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

[`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

#### Defined in

[circle/circularLinkedQueue.ts:32](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L32)

• **new CircularLinkedQueue**\<`T`\>(`items`): [`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

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

[`CircularLinkedQueue`](CircularLinkedQueue.md)\<`T`\>

#### Defined in

[circle/circularLinkedQueue.ts:38](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L38)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

Queue.[toStringTag]

#### Defined in

[circle/circularLinkedQueue.ts:51](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L51)

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

[circle/circularLinkedQueue.ts:43](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L43)

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

[circle/circularLinkedQueue.ts:55](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L55)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

Queue.size

#### Defined in

[circle/circularLinkedQueue.ts:47](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L47)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the queue's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[Queue](../interfaces/Queue.md).[[iterator]](../interfaces/Queue.md#[iterator])

#### Defined in

[circle/circularLinkedQueue.ts:98](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L98)

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

[circle/circularLinkedQueue.ts:106](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L106)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[clear](../interfaces/Queue.md#clear)

#### Defined in

[circle/circularLinkedQueue.ts:59](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L59)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[entries](../interfaces/Queue.md#entries)

#### Defined in

[circle/circularLinkedQueue.ts:63](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L63)

___

### first

▸ **first**(): `undefined` \| `T`

Retrieves the first element added to the queue without removing it.

#### Returns

`undefined` \| `T`

The first element of the queue, or `undefined` if the queue is empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[first](../interfaces/Queue.md#first)

#### Defined in

[circle/circularLinkedQueue.ts:67](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L67)

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

[Queue](../interfaces/Queue.md).[forEach](../interfaces/Queue.md#foreach)

#### Defined in

[circle/circularLinkedQueue.ts:71](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L71)

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

[Queue](../interfaces/Queue.md).[front](../interfaces/Queue.md#front)

#### Defined in

[circle/circularLinkedQueue.ts:78](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L78)

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

[Queue](../interfaces/Queue.md).[has](../interfaces/Queue.md#has)

#### Defined in

[circle/circularLinkedQueue.ts:82](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L82)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[keys](../interfaces/Queue.md#keys)

#### Defined in

[circle/circularLinkedQueue.ts:86](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L86)

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

[circle/circularLinkedQueue.ts:114](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L114)

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

[circle/circularLinkedQueue.ts:122](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L122)

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

[Queue](../interfaces/Queue.md).[push](../interfaces/Queue.md#push)

#### Defined in

[circle/circularLinkedQueue.ts:90](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L90)

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

[circle/circularLinkedQueue.ts:130](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L130)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the queue.

#### Returns

`undefined` \| `T`

The first element of the queue, or `undefined` if the queue is empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[shift](../interfaces/Queue.md#shift)

#### Defined in

[circle/circularLinkedQueue.ts:94](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L94)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[values](../interfaces/Queue.md#values)

#### Defined in

[circle/circularLinkedQueue.ts:102](https://github.com/havelessbemore/circle-ds/blob/8fae11d/src/circle/circularLinkedQueue.ts#L102)
