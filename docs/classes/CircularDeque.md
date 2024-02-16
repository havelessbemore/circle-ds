[circle-ds](../README.md) / [Exports](../modules.md) / CircularDeque

# Class: CircularDeque\<T\>

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

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularDeque`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularDeque.md#constructor)

### Properties

- [\_capacity](CircularDeque.md#_capacity)
- [isFinite](CircularDeque.md#isfinite)

### Accessors

- [[toStringTag]](CircularDeque.md#[tostringtag])
- [capacity](CircularDeque.md#capacity)
- [size](CircularDeque.md#size)

### Methods

- [[iterator]](CircularDeque.md#[iterator])
- [\_push](CircularDeque.md#_push)
- [\_unshift](CircularDeque.md#_unshift)
- [addListener](CircularDeque.md#addlistener)
- [clear](CircularDeque.md#clear)
- [emit](CircularDeque.md#emit)
- [entries](CircularDeque.md#entries)
- [evictHead](CircularDeque.md#evicthead)
- [evictTail](CircularDeque.md#evicttail)
- [first](CircularDeque.md#first)
- [forEach](CircularDeque.md#foreach)
- [front](CircularDeque.md#front)
- [has](CircularDeque.md#has)
- [isSequential](CircularDeque.md#issequential)
- [keys](CircularDeque.md#keys)
- [last](CircularDeque.md#last)
- [on](CircularDeque.md#on)
- [pop](CircularDeque.md#pop)
- [prependListener](CircularDeque.md#prependlistener)
- [push](CircularDeque.md#push)
- [removeListener](CircularDeque.md#removelistener)
- [sequentialReset](CircularDeque.md#sequentialreset)
- [shift](CircularDeque.md#shift)
- [top](CircularDeque.md#top)
- [unshift](CircularDeque.md#unshift)
- [values](CircularDeque.md#values)

## Constructors

### constructor

• **new CircularDeque**\<`T`\>(): [`CircularDeque`](CircularDeque.md)\<`T`\>

Creates a new deque. Default `capacity` is `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDeque.ts:59](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L59)

• **new CircularDeque**\<`T`\>(`capacity?`): [`CircularDeque`](CircularDeque.md)\<`T`\>

Creates a new deque with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the deque's capacity. |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDeque.ts:65](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L65)

• **new CircularDeque**\<`T`\>(`items`): [`CircularDeque`](CircularDeque.md)\<`T`\>

Creates a new deque from the given items. `capacity` will equal the number of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the initial values in the deque. |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDeque.ts:71](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L71)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularDeque.ts:25](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L25)

___

### isFinite

• `Protected` **isFinite**: `boolean`

Whether capacity is finite (true) or infinite (false).

#### Defined in

[circle/circularDeque.ts:36](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L36)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Implementation of

Deque.[toStringTag]

#### Defined in

[circle/circularDeque.ts:127](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L127)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularDeque.ts:113](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L113)

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

[circle/circularDeque.ts:134](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L134)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

Deque.size

#### Defined in

[circle/circularDeque.ts:120](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L120)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Deque](../interfaces/Deque.md).[[iterator]](../interfaces/Deque.md#[iterator])

#### Defined in

[circle/circularDeque.ts:369](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L369)

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

[circle/circularDeque.ts:620](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L620)

___

### \_unshift

▸ **_unshift**(`elems`, `num`): `void`

Append new elements to the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elems` | `T`[] | The elements to append. |
| `num` | `number` | The number of elements to append. |

#### Returns

`void`

#### Defined in

[circle/circularDeque.ts:701](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L701)

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

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Defined in

[circle/circularDeque.ts:168](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L168)

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

[circle/circularDeque.ts:456](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L456)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Iterate through the collection's entries.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Deque](../interfaces/Deque.md).[entries](../interfaces/Deque.md#entries)

#### Defined in

[circle/circularDeque.ts:182](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L182)

___

### evictHead

▸ **evictHead**(`count`): `void`

Removes a given number of elements from the deque.
If elements are removed, the [BoundedEvent.Overflow](../modules.md#overflow) event
is emitted one or more times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The number of elements to evict. |

#### Returns

`void`

#### Defined in

[circle/circularDeque.ts:467](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L467)

___

### evictTail

▸ **evictTail**(`count`): `void`

Removes a given number of elements from the deque.
If elements are removed, the [BoundedEvent.Overflow](../modules.md#overflow) event
is emitted one or more times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The number of elements to evict. |

#### Returns

`void`

#### Defined in

[circle/circularDeque.ts:513](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L513)

___

### first

▸ **first**(): `undefined` \| `T`

Get the first element in the deque.

Alias for [front()](CircularDeque.md#front).

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[first](../interfaces/Deque.md#first)

#### Defined in

[circle/circularDeque.ts:195](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L195)

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

[Deque](../interfaces/Deque.md).[forEach](../interfaces/Deque.md#foreach)

#### Defined in

[circle/circularDeque.ts:207](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L207)

___

### front

▸ **front**(): `undefined` \| `T`

Get the element at the front of the deque.

Alias for [first()](CircularDeque.md#first).

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[front](../interfaces/Deque.md#front)

#### Defined in

[circle/circularDeque.ts:225](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L225)

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

[Deque](../interfaces/Deque.md).[has](../interfaces/Deque.md#has)

#### Defined in

[circle/circularDeque.ts:238](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L238)

___

### isSequential

▸ **isSequential**(): `boolean`

Returns whether the deque is stored sequentially in memory.

#### Returns

`boolean`

`true` if the deque is sequential in memory, `false` otherwise.

#### Defined in

[circle/circularDeque.ts:610](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L610)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Iterate through the collection's keys.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`number`\>

an iterable of keys.

#### Implementation of

[Deque](../interfaces/Deque.md).[keys](../interfaces/Deque.md#keys)

#### Defined in

[circle/circularDeque.ts:255](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L255)

___

### last

▸ **last**(): `undefined` \| `T`

Get the last element in the deque.

Alias for [top()](CircularDeque.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[last](../interfaces/Deque.md#last)

#### Defined in

[circle/circularDeque.ts:268](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L268)

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

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularBase.ts#L73)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the last element from the deque.

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[pop](../interfaces/Deque.md#pop)

#### Defined in

[circle/circularDeque.ts:277](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L277)

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

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularBase.ts#L102)

___

### push

▸ **push**(`...elems`): `number`

Inserts new elements at the end of the deque.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`number`

The new size of the deque.

#### Implementation of

[Deque](../interfaces/Deque.md).[push](../interfaces/Deque.md#push)

#### Defined in

[circle/circularDeque.ts:298](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L298)

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

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularBase.ts#L127)

___

### sequentialReset

▸ **sequentialReset**(`capacity`): `boolean`

Adjusts the deque to fit within the given capacity.

Assumes the deque is A) sequential in memory and B) size \<= capacity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity` | `number` | The new capacity. |

#### Returns

`boolean`

`true` if the deque was reset, `false` otherwise.

#### Defined in

[circle/circularDeque.ts:645](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L645)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes the element at the front of the deque.

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[shift](../interfaces/Deque.md#shift)

#### Defined in

[circle/circularDeque.ts:347](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L347)

___

### top

▸ **top**(): `undefined` \| `T`

Get the last element in the deque.

Alias for [last()](CircularDeque.md#last).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[top](../interfaces/Deque.md#top)

#### Defined in

[circle/circularDeque.ts:431](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L431)

___

### unshift

▸ **unshift**(`...elems`): `number`

Inserts new elements at the end of the deque.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`number`

The new size of the deque.

#### Implementation of

[Deque](../interfaces/Deque.md).[unshift](../interfaces/Deque.md#unshift)

#### Defined in

[circle/circularDeque.ts:380](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L380)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Deque](../interfaces/Deque.md).[values](../interfaces/Deque.md#values)

#### Defined in

[circle/circularDeque.ts:445](https://github.com/havelessbemore/circle-ds/blob/de49230/src/circle/circularDeque.ts#L445)
