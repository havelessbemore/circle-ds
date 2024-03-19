[circle-ds](../README.md) / [Exports](../modules.md) / CircularArrayList

# Class: CircularArrayList\<T\>

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

  ↳ **`CircularArrayList`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`List`](../interfaces/List.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularArrayList.md#constructor)

### Accessors

- [[toStringTag]](CircularArrayList.md#[tostringtag])
- [capacity](CircularArrayList.md#capacity)
- [size](CircularArrayList.md#size)

### Methods

- [[iterator]](CircularArrayList.md#[iterator])
- [addListener](CircularArrayList.md#addlistener)
- [at](CircularArrayList.md#at)
- [clear](CircularArrayList.md#clear)
- [delete](CircularArrayList.md#delete)
- [entries](CircularArrayList.md#entries)
- [fill](CircularArrayList.md#fill)
- [first](CircularArrayList.md#first)
- [forEach](CircularArrayList.md#foreach)
- [has](CircularArrayList.md#has)
- [keys](CircularArrayList.md#keys)
- [last](CircularArrayList.md#last)
- [on](CircularArrayList.md#on)
- [pop](CircularArrayList.md#pop)
- [push](CircularArrayList.md#push)
- [removeListener](CircularArrayList.md#removelistener)
- [set](CircularArrayList.md#set)
- [shift](CircularArrayList.md#shift)
- [slice](CircularArrayList.md#slice)
- [splice](CircularArrayList.md#splice)
- [unshift](CircularArrayList.md#unshift)
- [values](CircularArrayList.md#values)

## Constructors

### constructor

• **new CircularArrayList**\<`T`\>(): [`CircularArrayList`](CircularArrayList.md)\<`T`\>

Creates a new list. Default `capacity` is `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularArrayList`](CircularArrayList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularArrayList.ts:53](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L53)

• **new CircularArrayList**\<`T`\>(`capacity?`): [`CircularArrayList`](CircularArrayList.md)\<`T`\>

Creates a new list with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the list's capacity. |

#### Returns

[`CircularArrayList`](CircularArrayList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularArrayList.ts:59](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L59)

• **new CircularArrayList**\<`T`\>(`items`): [`CircularArrayList`](CircularArrayList.md)\<`T`\>

Creates a new list from the given items. `capacity` will equal the number of items.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the initial values in the list. |

#### Returns

[`CircularArrayList`](CircularArrayList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularArrayList.ts:65](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L65)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

List.[toStringTag]

#### Defined in

[collections/list/circularArrayList.ts:104](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L104)

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

[collections/list/circularArrayList.ts:96](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L96)

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

[collections/list/circularArrayList.ts:108](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L108)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

List.size

#### Defined in

[collections/list/circularArrayList.ts:100](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L100)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[List](../interfaces/List.md).[[iterator]](../interfaces/List.md#[iterator])

#### Defined in

[collections/list/circularArrayList.ts:537](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L537)

___

### addListener

▸ **addListener**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

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

[collections/circularBase.ts:34](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/circularBase.ts#L34)

___

### at

▸ **at**(`index?`): `undefined` \| `T`

Retrieves the element at the specified index in the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index?` | `number` | The zero-based index of the element to retrieve. |

#### Returns

`undefined` \| `T`

The element at the specified index, or `undefined` if the index is out of bounds.

#### Implementation of

[List](../interfaces/List.md).[at](../interfaces/List.md#at)

#### Defined in

[collections/list/circularArrayList.ts:139](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L139)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[List](../interfaces/List.md).[clear](../interfaces/List.md#clear)

#### Defined in

[collections/list/circularArrayList.ts:150](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L150)

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

[collections/list/circularArrayList.ts:210](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L210)

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

[collections/list/circularArrayList.ts:232](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L232)

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

[collections/list/circularArrayList.ts:238](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L238)

___

### first

▸ **first**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Defined in

[collections/list/circularArrayList.ts:261](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L261)

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

[List](../interfaces/List.md).[forEach](../interfaces/List.md#foreach)

#### Defined in

[collections/list/circularArrayList.ts:265](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L265)

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

[collections/list/circularArrayList.ts:276](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L276)

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

[collections/list/circularArrayList.ts:288](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L288)

___

### last

▸ **last**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Defined in

[collections/list/circularArrayList.ts:294](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L294)

___

### on

▸ **on**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

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

[collections/circularBase.ts:63](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/circularBase.ts#L63)

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

[collections/list/circularArrayList.ts:300](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L300)

___

### push

▸ **push**(`...items`): `number`

Adds one or more elements to the end of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `T`[] | The elements to add. |

#### Returns

`number`

The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[push](../interfaces/List.md#push)

#### Defined in

[collections/list/circularArrayList.ts:327](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L327)

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

[collections/circularBase.ts:85](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/circularBase.ts#L85)

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

[collections/list/circularArrayList.ts:346](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L346)

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

[collections/list/circularArrayList.ts:362](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L362)

___

### slice

▸ **slice**(`start?`, `end?`): [`CircularArrayList`](CircularArrayList.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`CircularArrayList`](CircularArrayList.md)\<`T`\>

A new list containing the specified elements.

#### Implementation of

[List](../interfaces/List.md).[slice](../interfaces/List.md#slice)

#### Defined in

[collections/list/circularArrayList.ts:388](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L388)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`CircularArrayList`](CircularArrayList.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`CircularArrayList`](CircularArrayList.md)\<`T`\>

A new list containing the deleted elements, if any.

#### Implementation of

[List](../interfaces/List.md).[splice](../interfaces/List.md#splice)

#### Defined in

[collections/list/circularArrayList.ts:416](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L416)

___

### unshift

▸ **unshift**(`...items`): `number`

Adds one or more elements to the beginning of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `T`[] | The elements to add to the beginning of the list. |

#### Returns

`number`

The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[unshift](../interfaces/List.md#unshift)

#### Defined in

[collections/list/circularArrayList.ts:541](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L541)

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

[collections/list/circularArrayList.ts:634](https://github.com/havelessbemore/circle-ds/blob/e3bcf89/src/collections/list/circularArrayList.ts#L634)
