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

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularStack.md#constructor)

### Accessors

- [[toStringTag]](CircularStack.md#[tostringtag])
- [capacity](CircularStack.md#capacity)
- [size](CircularStack.md#size)

### Methods

- [[iterator]](CircularStack.md#[iterator])
- [addListener](CircularStack.md#addlistener)
- [clear](CircularStack.md#clear)
- [entries](CircularStack.md#entries)
- [forEach](CircularStack.md#foreach)
- [has](CircularStack.md#has)
- [keys](CircularStack.md#keys)
- [last](CircularStack.md#last)
- [on](CircularStack.md#on)
- [pop](CircularStack.md#pop)
- [prependListener](CircularStack.md#prependlistener)
- [push](CircularStack.md#push)
- [removeListener](CircularStack.md#removelistener)
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

#### Defined in

[circle/circularStack.ts:25](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L25)

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

#### Defined in

[circle/circularStack.ts:31](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L31)

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

#### Defined in

[circle/circularStack.ts:37](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L37)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

Stack.[toStringTag]

#### Defined in

[circle/circularStack.ts:50](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L50)

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

[circle/circularStack.ts:42](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L42)

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

[circle/circularStack.ts:54](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L54)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

Stack.size

#### Defined in

[circle/circularStack.ts:46](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L46)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the stack's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[Stack](../interfaces/Stack.md).[[iterator]](../interfaces/Stack.md#[iterator])

#### Defined in

[circle/circularStack.ts:93](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L93)

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

[circle/circularStack.ts:105](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L105)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Defined in

[circle/circularStack.ts:58](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L58)

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

[circle/circularStack.ts:62](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L62)

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

[circle/circularStack.ts:66](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L66)

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

[circle/circularStack.ts:73](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L73)

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

[circle/circularStack.ts:77](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L77)

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

[circle/circularStack.ts:81](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L81)

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

[circle/circularStack.ts:113](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L113)

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

[circle/circularStack.ts:85](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L85)

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

[circle/circularStack.ts:121](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L121)

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

[circle/circularStack.ts:89](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L89)

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

[circle/circularStack.ts:129](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L129)

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

[circle/circularStack.ts:97](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L97)

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

[circle/circularStack.ts:101](https://github.com/havelessbemore/circle-ds/blob/fffc8f6/src/circle/circularStack.ts#L101)
