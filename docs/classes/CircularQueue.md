[circle-ds](../README.md) / [Exports](../modules.md) / CircularQueue

# Class: CircularQueue\<T\>

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

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularQueue`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Queue`](../interfaces/Queue.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularQueue.md#constructor)

### Properties

- [\_capacity](CircularQueue.md#_capacity)
- [isFinite](CircularQueue.md#isfinite)

### Accessors

- [[toStringTag]](CircularQueue.md#[tostringtag])
- [capacity](CircularQueue.md#capacity)
- [size](CircularQueue.md#size)

### Methods

- [[iterator]](CircularQueue.md#[iterator])
- [\_push](CircularQueue.md#_push)
- [addListener](CircularQueue.md#addlistener)
- [clear](CircularQueue.md#clear)
- [emit](CircularQueue.md#emit)
- [entries](CircularQueue.md#entries)
- [evict](CircularQueue.md#evict)
- [first](CircularQueue.md#first)
- [forEach](CircularQueue.md#foreach)
- [front](CircularQueue.md#front)
- [has](CircularQueue.md#has)
- [isSequential](CircularQueue.md#issequential)
- [keys](CircularQueue.md#keys)
- [on](CircularQueue.md#on)
- [prependListener](CircularQueue.md#prependlistener)
- [push](CircularQueue.md#push)
- [removeListener](CircularQueue.md#removelistener)
- [sequentialReset](CircularQueue.md#sequentialreset)
- [shift](CircularQueue.md#shift)
- [values](CircularQueue.md#values)

## Constructors

### constructor

• **new CircularQueue**\<`T`\>(): [`CircularQueue`](CircularQueue.md)\<`T`\>

Creates a new queue. Default `capacity` is `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularQueue.ts:59](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L59)

• **new CircularQueue**\<`T`\>(`capacity?`): [`CircularQueue`](CircularQueue.md)\<`T`\>

Creates a new queue with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the queue's capacity. |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularQueue.ts:65](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L65)

• **new CircularQueue**\<`T`\>(`items`): [`CircularQueue`](CircularQueue.md)\<`T`\>

Creates a new queue from the given items. `capacity` will equal the number of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the initial values in the queue. |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularQueue.ts:71](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L71)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularQueue.ts:25](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L25)

___

### isFinite

• `Protected` **isFinite**: `boolean`

Whether capacity is finite (true) or infinite (false).

#### Defined in

[circle/circularQueue.ts:36](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L36)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Defined in

[circle/circularQueue.ts:161](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L161)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularQueue.ts:113](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L113)

• `set` **capacity**(`capacity`): `void`

Sets the maximum number of elements that can be stored.

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`void`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularQueue.ts:120](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L120)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[size](../interfaces/Queue.md#size)

#### Defined in

[circle/circularQueue.ts:154](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L154)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Queue](../interfaces/Queue.md).[[iterator]](../interfaces/Queue.md#[iterator])

#### Defined in

[circle/circularQueue.ts:339](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L339)

___

### \_push

▸ **_push**(`elems`, `max`): `void`

Append new elements to the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elems` | `T`[] | The elements to append. |
| `max` | `number` | The number of elements to append. |

#### Returns

`void`

#### Defined in

[circle/circularQueue.ts:480](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L480)

___

### addListener

▸ **addListener**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* By default, event listeners are invoked in the order they are added.
The `prependListener()` method can be used as an alternative to add
the event listener to the beginning of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[addListener](../interfaces/Bounded.md#addlistener)

#### Inherited from

CircularBase.addListener

#### Defined in

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[clear](../interfaces/Queue.md#clear)

#### Defined in

[circle/circularQueue.ts:168](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L168)

___

### emit

▸ **emit**(`evicted`): `void`

Emit an event containing the items evicted from the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `evicted` | `T`[] | The items evicted from the collection. |

#### Returns

`void`

#### Defined in

[circle/circularQueue.ts:361](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L361)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Iterate through the collection's entries.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Queue](../interfaces/Queue.md).[entries](../interfaces/Queue.md#entries)

#### Defined in

[circle/circularQueue.ts:182](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L182)

___

### evict

▸ **evict**(`count`): `void`

Removes a given number of elements from the queue.
If elements are removed, the [BoundedEvent.Overflow](../modules.md#overflow) event
is emitted one or more times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The number of elements to evict. |

#### Returns

`void`

#### Defined in

[circle/circularQueue.ts:372](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L372)

___

### first

▸ **first**(): `undefined` \| `T`

Get the first element in the queue.

Alias for [front()](CircularQueue.md#front).

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[first](../interfaces/Queue.md#first)

#### Defined in

[circle/circularQueue.ts:195](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L195)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each element in the collection.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `T`, `index`: `number`, `collection`: `this`) => `void` | A function that accepts up to three arguments. It is called once per element. |
| `thisArg?` | `unknown` | An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used. |

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[forEach](../interfaces/Queue.md#foreach)

#### Defined in

[circle/circularQueue.ts:207](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L207)

___

### front

▸ **front**(): `undefined` \| `T`

Get the element at the front of the queue.

Alias for [first()](CircularQueue.md#first).

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[front](../interfaces/Queue.md#front)

#### Defined in

[circle/circularQueue.ts:225](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L225)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a given element is in the collection.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The element to search for |

#### Returns

`boolean`

a boolean indicating if `value` was found or not

#### Implementation of

[Queue](../interfaces/Queue.md).[has](../interfaces/Queue.md#has)

#### Defined in

[circle/circularQueue.ts:238](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L238)

___

### isSequential

▸ **isSequential**(): `boolean`

Returns whether the queue is stored sequentially in memory.

#### Returns

`boolean`

`true` if the queue is sequential in memory, `false` otherwise.

#### Defined in

[circle/circularQueue.ts:470](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L470)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Iterate through the collection's keys.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`number`\>

an iterable of keys.

#### Implementation of

[Queue](../interfaces/Queue.md).[keys](../interfaces/Queue.md#keys)

#### Defined in

[circle/circularQueue.ts:255](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L255)

___

### on

▸ **on**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* By default, event listeners are invoked in the order they are added.
The `prependListener()` method can be used as an alternative to add
the event listener to the beginning of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[on](../interfaces/Bounded.md#on)

#### Inherited from

CircularBase.on

#### Defined in

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularBase.ts#L73)

___

### prependListener

▸ **prependListener**(`event`, `listener`): `this`

Adds the listener function to the beginning of the listeners array for
the [BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* Alternatively, the `addListener()` method can be used to add
the event listener to the end of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[prependListener](../interfaces/Bounded.md#prependlistener)

#### Inherited from

CircularBase.prependListener

#### Defined in

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularBase.ts#L102)

___

### push

▸ **push**(`...elems`): `number`

Inserts new elements at the end of the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`number`

The new size of the queue.

#### Implementation of

[Queue](../interfaces/Queue.md).[push](../interfaces/Queue.md#push)

#### Defined in

[circle/circularQueue.ts:268](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L268)

___

### removeListener

▸ **removeListener**(`event`, `listener`): `this`

Removes the specified listener from the listener array for the event.

At most once instance of a listener will be removed. If a listener
has been added multiple times for the same event, this method should
be called once per instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[removeListener](../interfaces/Bounded.md#removelistener)

#### Inherited from

CircularBase.removeListener

#### Defined in

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularBase.ts#L127)

___

### sequentialReset

▸ **sequentialReset**(`capacity`): `boolean`

Adjusts the queue to fit within the given capacity.

Assumes the queue is A) sequential in memory and B) size \<= capacity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity` | `number` | The new capacity. |

#### Returns

`boolean`

`true` if the queue was reset, `false` otherwise.

#### Defined in

[circle/circularQueue.ts:505](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L505)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes the element at the front of the queue.

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[shift](../interfaces/Queue.md#shift)

#### Defined in

[circle/circularQueue.ts:317](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L317)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Queue](../interfaces/Queue.md).[values](../interfaces/Queue.md#values)

#### Defined in

[circle/circularQueue.ts:350](https://github.com/havelessbemore/circle-ds/blob/7c429bf/src/circle/circularQueue.ts#L350)
