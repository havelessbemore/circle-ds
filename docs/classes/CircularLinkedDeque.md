[circle-ds](../README.md) / [Exports](../modules.md) / CircularLinkedDeque

# Class: CircularLinkedDeque\<T\>

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

  ↳ **`CircularLinkedDeque`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedDeque.md#constructor)

### Properties

- [\_capacity](CircularLinkedDeque.md#_capacity)

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
- [prependListener](CircularLinkedDeque.md#prependlistener)
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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedDeque.ts:47](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L47)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedDeque.ts:53](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L53)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedDeque.ts:59](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L59)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularLinkedDeque.ts:30](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L30)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Implementation of

Deque.[toStringTag]

#### Defined in

[circle/circularLinkedDeque.ts:113](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L113)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularLinkedDeque.ts:99](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L99)

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

[circle/circularLinkedDeque.ts:120](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L120)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

Deque.size

#### Defined in

[circle/circularLinkedDeque.ts:106](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L106)

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

[circle/circularLinkedDeque.ts:342](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L342)

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

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Defined in

[circle/circularLinkedDeque.ts:155](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L155)

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

[circle/circularLinkedDeque.ts:169](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L169)

___

### first

▸ **first**(): `undefined` \| `T`

Get the first element in the queue.

Alias for [top()](CircularLinkedDeque.md#top).

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[first](../interfaces/Deque.md#first)

#### Defined in

[circle/circularLinkedDeque.ts:184](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L184)

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

[circle/circularLinkedDeque.ts:196](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L196)

___

### front

▸ **front**(): `undefined` \| `T`

Get the element at the front of the queue.

Alias for [top()](CircularLinkedDeque.md#top).

#### Returns

`undefined` \| `T`

the first element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[front](../interfaces/Deque.md#front)

#### Defined in

[circle/circularLinkedDeque.ts:214](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L214)

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

[circle/circularLinkedDeque.ts:227](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L227)

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

[circle/circularLinkedDeque.ts:245](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L245)

___

### last

▸ **last**(): `undefined` \| `T`

Get the last element pushed onto the stack.

Alias for [top()](CircularLinkedDeque.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[last](../interfaces/Deque.md#last)

#### Defined in

[circle/circularLinkedDeque.ts:258](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L258)

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

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L73)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the top element from the stack and returns it.

#### Returns

`undefined` \| `T`

the top element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[pop](../interfaces/Deque.md#pop)

#### Defined in

[circle/circularLinkedDeque.ts:267](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L267)

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

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L102)

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

[Deque](../interfaces/Deque.md).[push](../interfaces/Deque.md#push)

#### Defined in

[circle/circularLinkedDeque.ts:285](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L285)

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

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L127)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes the element at the front of the queue.

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[shift](../interfaces/Deque.md#shift)

#### Defined in

[circle/circularLinkedDeque.ts:323](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L323)

___

### top

▸ **top**(): `undefined` \| `T`

Get the last element pushed onto the stack.

Alias for [top()](CircularLinkedDeque.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[top](../interfaces/Deque.md#top)

#### Defined in

[circle/circularLinkedDeque.ts:353](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L353)

___

### unshift

▸ **unshift**(`...elems`): `number`

Inserts new elements at the front of the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`number`

The overwritten elements, if any.

#### Implementation of

[Deque](../interfaces/Deque.md).[unshift](../interfaces/Deque.md#unshift)

#### Defined in

[circle/circularLinkedDeque.ts:364](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L364)

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

[circle/circularLinkedDeque.ts:403](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularLinkedDeque.ts#L403)
