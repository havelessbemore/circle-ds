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

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularDeque.md#constructor)

### Accessors

- [[toStringTag]](CircularDeque.md#[tostringtag])
- [capacity](CircularDeque.md#capacity)
- [size](CircularDeque.md#size)

### Methods

- [[iterator]](CircularDeque.md#[iterator])
- [addListener](CircularDeque.md#addlistener)
- [clear](CircularDeque.md#clear)
- [entries](CircularDeque.md#entries)
- [first](CircularDeque.md#first)
- [forEach](CircularDeque.md#foreach)
- [front](CircularDeque.md#front)
- [has](CircularDeque.md#has)
- [keys](CircularDeque.md#keys)
- [last](CircularDeque.md#last)
- [on](CircularDeque.md#on)
- [pop](CircularDeque.md#pop)
- [push](CircularDeque.md#push)
- [removeListener](CircularDeque.md#removelistener)
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

#### Defined in

[collections/deque/circularDeque.ts:25](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L25)

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

#### Defined in

[collections/deque/circularDeque.ts:31](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L31)

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

#### Defined in

[collections/deque/circularDeque.ts:37](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L37)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

Deque.[toStringTag]

#### Defined in

[collections/deque/circularDeque.ts:50](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L50)

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

[collections/deque/circularDeque.ts:42](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L42)

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

[collections/deque/circularDeque.ts:54](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L54)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

Deque.size

#### Defined in

[collections/deque/circularDeque.ts:46](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L46)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the queue's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[Deque](../interfaces/Deque.md).[[iterator]](../interfaces/Deque.md#[iterator])

#### Defined in

[collections/deque/circularDeque.ts:105](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L105)

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

[collections/deque/circularDeque.ts:121](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L121)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Defined in

[collections/deque/circularDeque.ts:58](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L58)

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

[collections/deque/circularDeque.ts:62](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L62)

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

[collections/deque/circularDeque.ts:66](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L66)

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

[collections/deque/circularDeque.ts:70](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L70)

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

[collections/deque/circularDeque.ts:77](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L77)

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

[collections/deque/circularDeque.ts:81](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L81)

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

[collections/deque/circularDeque.ts:85](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L85)

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

[collections/deque/circularDeque.ts:89](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L89)

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

[collections/deque/circularDeque.ts:129](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L129)

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

[collections/deque/circularDeque.ts:93](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L93)

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

[collections/deque/circularDeque.ts:97](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L97)

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

[collections/deque/circularDeque.ts:137](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L137)

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

[collections/deque/circularDeque.ts:101](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L101)

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

[collections/deque/circularDeque.ts:109](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L109)

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

[collections/deque/circularDeque.ts:113](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L113)

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

[collections/deque/circularDeque.ts:117](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/deque/circularDeque.ts#L117)
