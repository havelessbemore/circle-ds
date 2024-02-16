[circle-ds](../README.md) / [Exports](../modules.md) / CircularStack

# Class: CircularStack\<T\>

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

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularStack`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularStack.md#constructor)

### Properties

- [\_capacity](CircularStack.md#_capacity)
- [isFinite](CircularStack.md#isfinite)

### Accessors

- [[toStringTag]](CircularStack.md#[tostringtag])
- [capacity](CircularStack.md#capacity)
- [size](CircularStack.md#size)

### Methods

- [[iterator]](CircularStack.md#[iterator])
- [\_push](CircularStack.md#_push)
- [addListener](CircularStack.md#addlistener)
- [clear](CircularStack.md#clear)
- [emit](CircularStack.md#emit)
- [entries](CircularStack.md#entries)
- [evict](CircularStack.md#evict)
- [forEach](CircularStack.md#foreach)
- [has](CircularStack.md#has)
- [isSequential](CircularStack.md#issequential)
- [keys](CircularStack.md#keys)
- [last](CircularStack.md#last)
- [on](CircularStack.md#on)
- [pop](CircularStack.md#pop)
- [prependListener](CircularStack.md#prependlistener)
- [push](CircularStack.md#push)
- [removeListener](CircularStack.md#removelistener)
- [sequentialReset](CircularStack.md#sequentialreset)
- [top](CircularStack.md#top)
- [values](CircularStack.md#values)

## Constructors

### constructor

• **new CircularStack**\<`T`\>(): [`CircularStack`](CircularStack.md)\<`T`\>

Creates a new stack. Default `capacity` is `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularStack.ts:59](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L59)

• **new CircularStack**\<`T`\>(`capacity?`): [`CircularStack`](CircularStack.md)\<`T`\>

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

[`CircularStack`](CircularStack.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularStack.ts:65](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L65)

• **new CircularStack**\<`T`\>(`items`): [`CircularStack`](CircularStack.md)\<`T`\>

Creates a new stack from the given items. `capacity` will equal the number of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the initial values in the stack. |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularStack.ts:71](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L71)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularStack.ts:25](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L25)

___

### isFinite

• `Protected` **isFinite**: `boolean`

Whether capacity is finite (true) or infinite (false).

#### Defined in

[circle/circularStack.ts:36](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L36)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Implementation of

Stack.[toStringTag]

#### Defined in

[circle/circularStack.ts:127](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L127)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularStack.ts:113](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L113)

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

[circle/circularStack.ts:134](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L134)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

Stack.size

#### Defined in

[circle/circularStack.ts:120](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L120)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Stack](../interfaces/Stack.md).[[iterator]](../interfaces/Stack.md#[iterator])

#### Defined in

[circle/circularStack.ts:327](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L327)

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

[circle/circularStack.ts:482](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L482)

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

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements from the collection.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Defined in

[circle/circularStack.ts:168](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L168)

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

[circle/circularStack.ts:363](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L363)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Iterate through the collection's entries.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Stack](../interfaces/Stack.md).[entries](../interfaces/Stack.md#entries)

#### Defined in

[circle/circularStack.ts:182](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L182)

___

### evict

▸ **evict**(`count`): `void`

Removes a given number of elements from the stack.
If elements are removed, the [BoundedEvent.Overflow](../modules.md#overflow) event
is emitted one or more times.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The number of elements to evict. |

#### Returns

`void`

#### Defined in

[circle/circularStack.ts:374](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L374)

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

[Stack](../interfaces/Stack.md).[forEach](../interfaces/Stack.md#foreach)

#### Defined in

[circle/circularStack.ts:196](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L196)

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

[Stack](../interfaces/Stack.md).[has](../interfaces/Stack.md#has)

#### Defined in

[circle/circularStack.ts:216](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L216)

___

### isSequential

▸ **isSequential**(): `boolean`

Returns whether the stack is stored sequentially in memory.

#### Returns

`boolean`

`true` if the stack is sequential in memory, `false` otherwise.

#### Defined in

[circle/circularStack.ts:472](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L472)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Iterate through the collection's keys.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`number`\>

an iterable of keys.

#### Implementation of

[Stack](../interfaces/Stack.md).[keys](../interfaces/Stack.md#keys)

#### Defined in

[circle/circularStack.ts:233](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L233)

___

### last

▸ **last**(): `undefined` \| `T`

Get the last element in the stack.

Alias for [top()](CircularStack.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[last](../interfaces/Stack.md#last)

#### Defined in

[circle/circularStack.ts:246](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L246)

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

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularBase.ts#L73)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the element at the top of the stack.

#### Returns

`undefined` \| `T`

the top element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[pop](../interfaces/Stack.md#pop)

#### Defined in

[circle/circularStack.ts:255](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L255)

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

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularBase.ts#L102)

___

### push

▸ **push**(`...elems`): `number`

Inserts new elements at the end of the stack.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`number`

The new size of the stack.

#### Implementation of

[Stack](../interfaces/Stack.md).[push](../interfaces/Stack.md#push)

#### Defined in

[circle/circularStack.ts:276](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L276)

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

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularBase.ts#L127)

___

### sequentialReset

▸ **sequentialReset**(`capacity`): `boolean`

Adjusts the stack to fit within the given capacity.

Assumes the stack is A) sequential in memory and B) size \<= capacity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity` | `number` | the new capacity. |

#### Returns

`boolean`

`true` if the stack was reset, `false` otherwise.

#### Defined in

[circle/circularStack.ts:507](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L507)

___

### top

▸ **top**(): `undefined` \| `T`

Get the last element in the stack.

Alias for [last()](CircularStack.md#last).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[top](../interfaces/Stack.md#top)

#### Defined in

[circle/circularStack.ts:338](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L338)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Stack](../interfaces/Stack.md).[values](../interfaces/Stack.md#values)

#### Defined in

[circle/circularStack.ts:352](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/circle/circularStack.ts#L352)
