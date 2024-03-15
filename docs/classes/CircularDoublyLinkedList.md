[circle-ds](../README.md) / [Exports](../modules.md) / CircularDoublyLinkedList

# Class: CircularDoublyLinkedList\<T\>

A bounded collection restricts the number of elements it can hold to a
specified capacity. When an attempt is made to add elements beyond this
capacity, the collection may either throw an error or remove existing elements
to make room for the new ones. If the latter, 'Overflow' events should be triggered.

The interface provides methods to manage event listeners for two types of events:
- `Overflow`: Emitted when elements are removed from the collection due to it
  exceeding its capacity. Listeners receive an array of the removed
  elements as an argument. Removed elements may be sent across 1 or more
  event instances.
- General events: Allows for listening to other events within the
  collection. The nature of these events is determined by the concrete
  implementation of the interface.

Methods include:
- `addListener` and `on`: Attach a listener to the end of the listeners array for a
  specified event. If a listener is added multiple times, it will be invoked multiple
  times per event.
- `prependListener`: Similar to `addListener`, but adds the listener to the beginning
  of the listeners array.
- `removeListener`: Removes a listener for a specified event. If the listener was added
  multiple times, each call removes one instance.

Implementers of this interface should ensure thread safety and consistency of the
collection's state, especially when dealing with asynchronous event listeners.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularDoublyLinkedList`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`List`](../interfaces/List.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularDoublyLinkedList.md#constructor)

### Accessors

- [[toStringTag]](CircularDoublyLinkedList.md#[tostringtag])
- [capacity](CircularDoublyLinkedList.md#capacity)
- [size](CircularDoublyLinkedList.md#size)

### Methods

- [[iterator]](CircularDoublyLinkedList.md#[iterator])
- [addListener](CircularDoublyLinkedList.md#addlistener)
- [at](CircularDoublyLinkedList.md#at)
- [clear](CircularDoublyLinkedList.md#clear)
- [delete](CircularDoublyLinkedList.md#delete)
- [entries](CircularDoublyLinkedList.md#entries)
- [fill](CircularDoublyLinkedList.md#fill)
- [forEach](CircularDoublyLinkedList.md#foreach)
- [has](CircularDoublyLinkedList.md#has)
- [keys](CircularDoublyLinkedList.md#keys)
- [on](CircularDoublyLinkedList.md#on)
- [pop](CircularDoublyLinkedList.md#pop)
- [prependListener](CircularDoublyLinkedList.md#prependlistener)
- [push](CircularDoublyLinkedList.md#push)
- [removeListener](CircularDoublyLinkedList.md#removelistener)
- [set](CircularDoublyLinkedList.md#set)
- [shift](CircularDoublyLinkedList.md#shift)
- [slice](CircularDoublyLinkedList.md#slice)
- [splice](CircularDoublyLinkedList.md#splice)
- [unshift](CircularDoublyLinkedList.md#unshift)
- [values](CircularDoublyLinkedList.md#values)

## Constructors

### constructor

• **new CircularDoublyLinkedList**\<`T`\>(): [`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

Creates a standard linked list (no capacity restriction).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDoublyLinkedList.ts:35](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L35)

• **new CircularDoublyLinkedList**\<`T`\>(`capacity?`): [`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

Creates a linked list with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the list's capacity. |

#### Returns

[`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDoublyLinkedList.ts:41](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L41)

• **new CircularDoublyLinkedList**\<`T`\>(`items`): [`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

Creates a linked list with the given items. Capacity is set to the number of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the values to store in the list. |

#### Returns

[`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularDoublyLinkedList.ts:47](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L47)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

List.[toStringTag]

#### Defined in

[circle/circularDoublyLinkedList.ts:91](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L91)

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

[circle/circularDoublyLinkedList.ts:83](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L83)

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

[circle/circularDoublyLinkedList.ts:95](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L95)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

List.size

#### Defined in

[circle/circularDoublyLinkedList.ts:87](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L87)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[List](../interfaces/List.md).[[iterator]](../interfaces/List.md#[iterator])

#### Defined in

[circle/circularDoublyLinkedList.ts:328](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L328)

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

[circle/circularBase.ts:36](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularBase.ts#L36)

___

### at

▸ **at**(`index`): `undefined` \| `T`

Retrieves the element at the specified index in the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the element to retrieve. |

#### Returns

`undefined` \| `T`

The element at the specified index, or `undefined` if the index is out of bounds.

#### Implementation of

[List](../interfaces/List.md).[at](../interfaces/List.md#at)

#### Defined in

[circle/circularDoublyLinkedList.ts:121](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L121)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[List](../interfaces/List.md).[clear](../interfaces/List.md#clear)

#### Defined in

[circle/circularDoublyLinkedList.ts:132](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L132)

___

### delete

▸ **delete**(`index`): `boolean`

Deletes the element at the specified index.
Subsequent elements are shifted one position towards the start of the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the element to delete. |

#### Returns

`boolean`

`true` if the element was successfully deleted, `false` otherwise.

#### Implementation of

[List](../interfaces/List.md).[delete](../interfaces/List.md#delete)

#### Defined in

[circle/circularDoublyLinkedList.ts:138](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L138)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Implementation of

[List](../interfaces/List.md).[entries](../interfaces/List.md#entries)

#### Defined in

[circle/circularDoublyLinkedList.ts:154](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L154)

___

### fill

▸ **fill**(`value`, `start?`, `end?`): `this`

Fills the list with the specified value from a start index (inclusive)
to an end index (exclusive).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to fill the list with. |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

`this`

The instance of the list for chaining.

#### Implementation of

[List](../interfaces/List.md).[fill](../interfaces/List.md#fill)

#### Defined in

[circle/circularDoublyLinkedList.ts:158](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L158)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `T`, `index`: `number`, `list`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Implementation of

[List](../interfaces/List.md).[forEach](../interfaces/List.md#foreach)

#### Defined in

[circle/circularDoublyLinkedList.ts:178](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L178)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a specific element exists within the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, `false` otherwise.

#### Implementation of

[List](../interfaces/List.md).[has](../interfaces/List.md#has)

#### Defined in

[circle/circularDoublyLinkedList.ts:189](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L189)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Implementation of

[List](../interfaces/List.md).[keys](../interfaces/List.md#keys)

#### Defined in

[circle/circularDoublyLinkedList.ts:193](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L193)

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

[circle/circularBase.ts:69](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularBase.ts#L69)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes and returns the last element of the list.

#### Returns

`undefined` \| `T`

The last element of the list, or `undefined` if the list is empty.

#### Implementation of

[List](../interfaces/List.md).[pop](../interfaces/List.md#pop)

#### Defined in

[circle/circularDoublyLinkedList.ts:197](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L197)

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

[circle/circularBase.ts:98](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularBase.ts#L98)

___

### push

▸ **push**(`...values`): `number`

Adds one or more elements to the end of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `T`[] | The elements to add. |

#### Returns

`number`

The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[push](../interfaces/List.md#push)

#### Defined in

[circle/circularDoublyLinkedList.ts:213](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L213)

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

[circle/circularBase.ts:123](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularBase.ts#L123)

___

### set

▸ **set**(`index`, `value`): `undefined` \| `T`

Replaces the element at the specified index with a new value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the element to replace. |
| `value` | `T` | The new value to set at the specified index. |

#### Returns

`undefined` \| `T`

The previous value at the index if replaced, otherwise `undefined`.

#### Implementation of

[List](../interfaces/List.md).[set](../interfaces/List.md#set)

#### Defined in

[circle/circularDoublyLinkedList.ts:234](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L234)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the list.
Subsequent elements are shifted one position towards the start of the list.

#### Returns

`undefined` \| `T`

The first element of the list, or `undefined` if the list is empty.

#### Implementation of

[List](../interfaces/List.md).[shift](../interfaces/List.md#shift)

#### Defined in

[circle/circularDoublyLinkedList.ts:250](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L250)

___

### slice

▸ **slice**(`start?`, `end?`): [`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

A new list containing the specified elements.

#### Implementation of

[List](../interfaces/List.md).[slice](../interfaces/List.md#slice)

#### Defined in

[circle/circularDoublyLinkedList.ts:266](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L266)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`CircularDoublyLinkedList`](CircularDoublyLinkedList.md)\<`T`\>

A new list containing the deleted elements, if any.

#### Implementation of

[List](../interfaces/List.md).[splice](../interfaces/List.md#splice)

#### Defined in

[circle/circularDoublyLinkedList.ts:294](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L294)

___

### unshift

▸ **unshift**(`...values`): `number`

Adds one or more elements to the beginning of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `T`[] | The elements to add to the beginning of the list. |

#### Returns

`number`

The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[unshift](../interfaces/List.md#unshift)

#### Defined in

[circle/circularDoublyLinkedList.ts:332](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L332)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Implementation of

[List](../interfaces/List.md).[values](../interfaces/List.md#values)

#### Defined in

[circle/circularDoublyLinkedList.ts:353](https://github.com/havelessbemore/circle-ds/blob/329e5c3/src/circle/circularDoublyLinkedList.ts#L353)
