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

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularLinkedQueue`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Queue`](../interfaces/Queue.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedQueue.md#constructor)

### Properties

- [\_capacity](CircularLinkedQueue.md#_capacity)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedQueue.ts:52](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L52)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedQueue.ts:58](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L58)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedQueue.ts:64](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L64)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularLinkedQueue.ts:29](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L29)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Defined in

[circle/circularLinkedQueue.ts:119](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L119)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularLinkedQueue.ts:105](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L105)

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

[circle/circularLinkedQueue.ts:126](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L126)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[size](../interfaces/Queue.md#size)

#### Defined in

[circle/circularLinkedQueue.ts:112](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L112)

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

[circle/circularLinkedQueue.ts:317](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L317)

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

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[clear](../interfaces/Queue.md#clear)

#### Defined in

[circle/circularLinkedQueue.ts:161](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L161)

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

[circle/circularLinkedQueue.ts:175](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L175)

___

### first

▸ **first**(): `undefined` \| `T`

Get the first element in the queue.

Alias for top | top().

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[first](../interfaces/Queue.md#first)

#### Defined in

[circle/circularLinkedQueue.ts:190](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L190)

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

[circle/circularLinkedQueue.ts:202](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L202)

___

### front

▸ **front**(): `undefined` \| `T`

Get the element at the front of the queue.

Alias for top | top().

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[front](../interfaces/Queue.md#front)

#### Defined in

[circle/circularLinkedQueue.ts:220](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L220)

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

[circle/circularLinkedQueue.ts:233](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L233)

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

[circle/circularLinkedQueue.ts:251](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L251)

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

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularBase.ts#L73)

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

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularBase.ts#L102)

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

The overwritten elements, if any.

#### Implementation of

[Queue](../interfaces/Queue.md).[push](../interfaces/Queue.md#push)

#### Defined in

[circle/circularLinkedQueue.ts:264](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L264)

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

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularBase.ts#L127)

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

[circle/circularLinkedQueue.ts:298](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L298)

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

[circle/circularLinkedQueue.ts:328](https://github.com/havelessbemore/circle-ds/blob/d546563/src/circle/circularLinkedQueue.ts#L328)
