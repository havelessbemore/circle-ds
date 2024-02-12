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

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularLinkedStack`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularLinkedStack.md#constructor)

### Properties

- [\_capacity](CircularLinkedStack.md#_capacity)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedStack.ts:53](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L53)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedStack.ts:59](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L59)

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

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularLinkedStack.ts:65](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L65)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularLinkedStack.ts:36](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L36)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Defined in

[circle/circularLinkedStack.ts:119](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L119)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularLinkedStack.ts:105](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L105)

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

[circle/circularLinkedStack.ts:126](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L126)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[size](../interfaces/Stack.md#size)

#### Defined in

[circle/circularLinkedStack.ts:112](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L112)

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

[circle/circularLinkedStack.ts:308](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L308)

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

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Defined in

[circle/circularLinkedStack.ts:161](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L161)

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

[circle/circularLinkedStack.ts:175](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L175)

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

[circle/circularLinkedStack.ts:191](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L191)

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

[circle/circularLinkedStack.ts:211](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L211)

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

[circle/circularLinkedStack.ts:229](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L229)

___

### last

▸ **last**(): `undefined` \| `T`

Get the last element pushed onto the stack.

Alias for [top()](CircularLinkedStack.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[last](../interfaces/Stack.md#last)

#### Defined in

[circle/circularLinkedStack.ts:242](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L242)

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

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L73)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes the top element from the stack and returns it.

#### Returns

`undefined` \| `T`

the top element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[pop](../interfaces/Stack.md#pop)

#### Defined in

[circle/circularLinkedStack.ts:251](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L251)

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

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L102)

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

[Stack](../interfaces/Stack.md).[push](../interfaces/Stack.md#push)

#### Defined in

[circle/circularLinkedStack.ts:269](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L269)

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

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L127)

___

### top

▸ **top**(): `undefined` \| `T`

Get the last element pushed onto the stack.

Alias for [top()](CircularLinkedStack.md#top).

#### Returns

`undefined` \| `T`

the last element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[top](../interfaces/Stack.md#top)

#### Defined in

[circle/circularLinkedStack.ts:319](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L319)

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

[circle/circularLinkedStack.ts:330](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularLinkedStack.ts#L330)
