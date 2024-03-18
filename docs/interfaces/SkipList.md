[circle-ds](../README.md) / [Exports](../modules.md) / SkipList

# Interface: SkipList\<T\>

Skip lists are a probabilistic data structure that allows for efficient
search, insertion, deletion, and access operations. A skip list maintains
multiple layers of linked lists, with each layer representing a subset of
the elements.

Skip lists use randomness to maintain balance among the levels, with the
`p` property controlling the probability of level assignment for new nodes,
and `maxLevel` determining the maximum height a skip list node can have.
This structure allows for operations that are efficient on average,
typically achieving logarithmic time complexity for search, insert,
and delete operations.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`List`](List.md)\<`T`\>

  ↳ **`SkipList`**

## Implemented by

- [`CircularSkipList`](../classes/CircularSkipList.md)

## Table of contents

### Properties

- [maxLevel](SkipList.md#maxlevel)
- [p](SkipList.md#p)

### Accessors

- [[toStringTag]](SkipList.md#[tostringtag])
- [levels](SkipList.md#levels)
- [size](SkipList.md#size)

### Methods

- [[iterator]](SkipList.md#[iterator])
- [at](SkipList.md#at)
- [clear](SkipList.md#clear)
- [delete](SkipList.md#delete)
- [entries](SkipList.md#entries)
- [fill](SkipList.md#fill)
- [forEach](SkipList.md#foreach)
- [has](SkipList.md#has)
- [keys](SkipList.md#keys)
- [pop](SkipList.md#pop)
- [push](SkipList.md#push)
- [set](SkipList.md#set)
- [shift](SkipList.md#shift)
- [slice](SkipList.md#slice)
- [splice](SkipList.md#splice)
- [unshift](SkipList.md#unshift)
- [values](SkipList.md#values)

## Properties

### maxLevel

• **maxLevel**: `number`

The maximum number of levels in the skip list.

#### Defined in

[types/skipList.d.ts:84](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/skipList.d.ts#L84)

___

### p

• **p**: `number`

The probability factor used to randomly determine the levels
of new nodes. Should be a value between 0 and 1, where a lower
value results in fewer levels on average.

#### Defined in

[types/skipList.d.ts:91](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/skipList.d.ts#L91)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

List.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L19)

___

### levels

• `get` **levels**(): `number`

The current number of levels in the skip list.

#### Returns

`number`

#### Defined in

[types/skipList.d.ts:79](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/skipList.d.ts#L79)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

List.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Inherited from

[List](List.md).[[iterator]](List.md#[iterator])

#### Defined in

[types/list.d.ts:124](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L124)

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

#### Inherited from

[List](List.md).[at](List.md#at)

#### Defined in

[types/list.d.ts:20](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L20)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[List](List.md).[clear](List.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L24)

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

#### Inherited from

[List](List.md).[delete](List.md#delete)

#### Defined in

[types/list.d.ts:30](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L30)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

An iterable iterator for the entries of the collection.

#### Inherited from

[List](List.md).[entries](List.md#entries)

#### Defined in

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L32)

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

#### Inherited from

[List](List.md).[fill](List.md#fill)

#### Defined in

[types/list.d.ts:42](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L42)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `T`, `key`: `number`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Inherited from

[List](List.md).[forEach](List.md#foreach)

#### Defined in

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L41)

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

#### Inherited from

[List](List.md).[has](List.md#has)

#### Defined in

[types/list.d.ts:51](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L51)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Inherited from

[List](List.md).[keys](List.md#keys)

#### Defined in

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L52)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes and returns the last element of the list.

#### Returns

`undefined` \| `T`

The last element of the list, or `undefined` if the list is empty.

#### Inherited from

[List](List.md).[pop](List.md#pop)

#### Defined in

[types/list.d.ts:58](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L58)

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

#### Inherited from

[List](List.md).[push](List.md#push)

#### Defined in

[types/list.d.ts:68](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L68)

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

#### Inherited from

[List](List.md).[set](List.md#set)

#### Defined in

[types/list.d.ts:78](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L78)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the list.
Subsequent elements are shifted one position towards the start of the list.

#### Returns

`undefined` \| `T`

The first element of the list, or `undefined` if the list is empty.

#### Inherited from

[List](List.md).[shift](List.md#shift)

#### Defined in

[types/list.d.ts:86](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L86)

___

### slice

▸ **slice**(`start?`, `end?`): [`List`](List.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`List`](List.md)\<`T`\>

A new list containing the specified elements.

#### Inherited from

[List](List.md).[slice](List.md#slice)

#### Defined in

[types/list.d.ts:97](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L97)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`List`](List.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`List`](List.md)\<`T`\>

A new list containing the deleted elements, if any.

#### Inherited from

[List](List.md).[splice](List.md#splice)

#### Defined in

[types/list.d.ts:109](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L109)

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

#### Inherited from

[List](List.md).[unshift](List.md#unshift)

#### Defined in

[types/list.d.ts:119](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/list.d.ts#L119)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`T`\>

An iterable iterator for the values of the collection.

#### Inherited from

[List](List.md).[values](List.md#values)

#### Defined in

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/86332f0/src/types/collection.d.ts#L60)
