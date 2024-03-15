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
- [prependListener](CircularSkipList.md#prependlistener)
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

[circle/circularSkipList.ts:76](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L76)

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

[circle/circularSkipList.ts:77](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L77)

• **new CircularSkipList**\<`T`\>(`config`): [`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `CircularSkipListConfig` |

#### Returns

[`CircularSkipList`](CircularSkipList.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularSkipList.ts:78](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L78)

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

[circle/circularSkipList.ts:79](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L79)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

SkipList.[toStringTag]

#### Defined in

[circle/circularSkipList.ts:140](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L140)

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

[circle/circularSkipList.ts:120](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L120)

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

[circle/circularSkipList.ts:144](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L144)

___

### levels

• `get` **levels**(): `number`

The current number of levels in the skip list.

#### Returns

`number`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[levels](../interfaces/SkipList.md#levels)

#### Defined in

[circle/circularSkipList.ts:124](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L124)

___

### maxLevel

• `get` **maxLevel**(): `number`

The maximum number of levels in the skip list.

#### Returns

`number`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[maxLevel](../interfaces/SkipList.md#maxlevel)

#### Defined in

[circle/circularSkipList.ts:128](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L128)

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

[circle/circularSkipList.ts:174](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L174)

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

[circle/circularSkipList.ts:132](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L132)

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

[circle/circularSkipList.ts:192](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L192)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

SkipList.size

#### Defined in

[circle/circularSkipList.ts:136](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L136)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[SkipList](../interfaces/SkipList.md).[[iterator]](../interfaces/SkipList.md#[iterator])

#### Defined in

[circle/circularSkipList.ts:397](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L397)

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

[circle/circularBase.ts:36](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularBase.ts#L36)

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

[circle/circularSkipList.ts:205](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L205)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[SkipList](../interfaces/SkipList.md).[clear](../interfaces/SkipList.md#clear)

#### Defined in

[circle/circularSkipList.ts:216](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L216)

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

[circle/circularSkipList.ts:223](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L223)

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

[circle/circularSkipList.ts:237](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L237)

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

[circle/circularSkipList.ts:241](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L241)

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

[circle/circularSkipList.ts:262](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L262)

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

[circle/circularSkipList.ts:273](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L273)

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

[circle/circularSkipList.ts:277](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L277)

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

[circle/circularBase.ts:69](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularBase.ts#L69)

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

[circle/circularSkipList.ts:281](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L281)

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

[circle/circularBase.ts:98](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularBase.ts#L98)

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

[circle/circularSkipList.ts:294](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L294)

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

[circle/circularBase.ts:123](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularBase.ts#L123)

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

[circle/circularSkipList.ts:313](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L313)

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

[circle/circularSkipList.ts:329](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L329)

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

[circle/circularSkipList.ts:342](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L342)

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

[circle/circularSkipList.ts:367](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L367)

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

[circle/circularSkipList.ts:401](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L401)

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

[circle/circularSkipList.ts:420](https://github.com/havelessbemore/circle-ds/blob/2846985/src/circle/circularSkipList.ts#L420)
