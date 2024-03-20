[circle-ds](../README.md) / [Exports](../modules.md) / CircularSkipList

# Class: CircularSkipList\<T\>

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

  ↳ **`CircularSkipList`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- [`SkipList`](../interfaces/SkipList.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularSkipList.md#constructor)

### Accessors

- [[toStringTag]](CircularSkipList.md#[tostringtag])
- [capacity](CircularSkipList.md#capacity)
- [levels](CircularSkipList.md#levels)
- [maxLevel](CircularSkipList.md#maxlevel)
- [p](CircularSkipList.md#p)
- [size](CircularSkipList.md#size)

### Methods

- [[iterator]](CircularSkipList.md#[iterator])
- [addListener](CircularSkipList.md#addlistener)
- [at](CircularSkipList.md#at)
- [clear](CircularSkipList.md#clear)
- [delete](CircularSkipList.md#delete)
- [entries](CircularSkipList.md#entries)
- [fill](CircularSkipList.md#fill)
- [forEach](CircularSkipList.md#foreach)
- [has](CircularSkipList.md#has)
- [keys](CircularSkipList.md#keys)
- [on](CircularSkipList.md#on)
- [pop](CircularSkipList.md#pop)
- [push](CircularSkipList.md#push)
- [removeListener](CircularSkipList.md#removelistener)
- [set](CircularSkipList.md#set)
- [shift](CircularSkipList.md#shift)
- [slice](CircularSkipList.md#slice)
- [splice](CircularSkipList.md#splice)
- [unshift](CircularSkipList.md#unshift)
- [values](CircularSkipList.md#values)

## Constructors

### constructor

• **new CircularSkipList**\<`T`\>(): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularSkipList.ts:93](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L93)

• **new CircularSkipList**\<`T`\>(`capacity?`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity?` | ``null`` \| `number` |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularSkipList.ts:94](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L94)

• **new CircularSkipList**\<`T`\>(`config`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`CircularSkipListConfig`](../interfaces/CircularSkipListConfig.md) |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularSkipList.ts:95](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L95)

• **new CircularSkipList**\<`T`\>(`items`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Iterable`\<`T`\> |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[collections/list/circularSkipList.ts:96](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L96)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

SkipList.[toStringTag]

#### Defined in

[collections/list/circularSkipList.ts:157](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L157)

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

[collections/list/circularSkipList.ts:137](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L137)

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

[collections/list/circularSkipList.ts:161](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L161)

___

### levels

• `get` **levels**(): `number`

The current number of levels in the skip list.

#### Returns

`number`

#### Implementation of

SkipList.levels

#### Defined in

[collections/list/circularSkipList.ts:141](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L141)

___

### maxLevel

• `get` **maxLevel**(): `number`

The maximum number of levels in the skip list.

#### Returns

`number`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[maxLevel](../interfaces/SkipList.md#maxlevel)

#### Defined in

[collections/list/circularSkipList.ts:145](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L145)

• `set` **maxLevel**(`maxLevel`): `void`

The maximum number of levels in the skip list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxLevel` | `number` |

#### Returns

`void`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[maxLevel](../interfaces/SkipList.md#maxlevel)

#### Defined in

[collections/list/circularSkipList.ts:191](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L191)

___

### p

• `get` **p**(): `number`

The probability factor used to randomly determine the levels
of new nodes. Should be a value between 0 and 1, where a lower
value results in fewer levels on average.

#### Returns

`number`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[p](../interfaces/SkipList.md#p)

#### Defined in

[collections/list/circularSkipList.ts:149](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L149)

• `set` **p**(`p`): `void`

The probability factor used to randomly determine the levels
of new nodes. Should be a value between 0 and 1, where a lower
value results in fewer levels on average.

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `number` |

#### Returns

`void`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[p](../interfaces/SkipList.md#p)

#### Defined in

[collections/list/circularSkipList.ts:209](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L209)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

SkipList.size

#### Defined in

[collections/list/circularSkipList.ts:153](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L153)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[SkipList](../interfaces/SkipList.md).[[iterator]](../interfaces/SkipList.md#[iterator])

#### Defined in

[collections/list/circularSkipList.ts:414](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L414)

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

[collections/circularBase.ts:34](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/circularBase.ts#L34)

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

[SkipList](../interfaces/SkipList.md).[at](../interfaces/SkipList.md#at)

#### Defined in

[collections/list/circularSkipList.ts:222](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L222)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[clear](../interfaces/SkipList.md#clear)

#### Defined in

[collections/list/circularSkipList.ts:234](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L234)

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

[SkipList](../interfaces/SkipList.md).[delete](../interfaces/SkipList.md#delete)

#### Defined in

[collections/list/circularSkipList.ts:241](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L241)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[entries](../interfaces/SkipList.md#entries)

#### Defined in

[collections/list/circularSkipList.ts:255](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L255)

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

[SkipList](../interfaces/SkipList.md).[fill](../interfaces/SkipList.md#fill)

#### Defined in

[collections/list/circularSkipList.ts:259](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L259)

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

[SkipList](../interfaces/SkipList.md).[forEach](../interfaces/SkipList.md#foreach)

#### Defined in

[collections/list/circularSkipList.ts:281](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L281)

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

[SkipList](../interfaces/SkipList.md).[has](../interfaces/SkipList.md#has)

#### Defined in

[collections/list/circularSkipList.ts:292](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L292)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[keys](../interfaces/SkipList.md#keys)

#### Defined in

[collections/list/circularSkipList.ts:296](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L296)

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

[collections/circularBase.ts:63](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/circularBase.ts#L63)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes and returns the last element of the list.

#### Returns

`undefined` \| `T`

The last element of the list, or `undefined` if the list is empty.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[pop](../interfaces/SkipList.md#pop)

#### Defined in

[collections/list/circularSkipList.ts:300](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L300)

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

[SkipList](../interfaces/SkipList.md).[push](../interfaces/SkipList.md#push)

#### Defined in

[collections/list/circularSkipList.ts:313](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L313)

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

[collections/circularBase.ts:85](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/circularBase.ts#L85)

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

[SkipList](../interfaces/SkipList.md).[set](../interfaces/SkipList.md#set)

#### Defined in

[collections/list/circularSkipList.ts:321](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L321)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the list.
Subsequent elements are shifted one position towards the start of the list.

#### Returns

`undefined` \| `T`

The first element of the list, or `undefined` if the list is empty.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[shift](../interfaces/SkipList.md#shift)

#### Defined in

[collections/list/circularSkipList.ts:338](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L338)

___

### slice

▸ **slice**(`start?`, `end?`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

A new list containing the specified elements.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[slice](../interfaces/SkipList.md#slice)

#### Defined in

[collections/list/circularSkipList.ts:351](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L351)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

A new list containing the deleted elements, if any.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[splice](../interfaces/SkipList.md#splice)

#### Defined in

[collections/list/circularSkipList.ts:384](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L384)

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

[SkipList](../interfaces/SkipList.md).[unshift](../interfaces/SkipList.md#unshift)

#### Defined in

[collections/list/circularSkipList.ts:418](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L418)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Implementation of

[SkipList](../interfaces/SkipList.md).[values](../interfaces/SkipList.md#values)

#### Defined in

[collections/list/circularSkipList.ts:426](https://github.com/havelessbemore/circle-ds/blob/3ecd468/src/collections/list/circularSkipList.ts#L426)
