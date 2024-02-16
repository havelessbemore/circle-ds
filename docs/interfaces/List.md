[circle-ds](../README.md) / [Exports](../modules.md) / List

# Interface: List\<V\>

Represents a generic list collection of elements, allowing for indexed
access, modification, and iteration. This interface extends the
`Collection` interface by adding list-specific operations.

The `List` interface supports both sequential and random access to elements,
making it suitable for a wide range of applications that require manipulation
of collections.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`List`**

## Implemented by

- [`CircularLinkedList`](../classes/CircularLinkedList.md)

## Table of contents

### Accessors

- [[toStringTag]](List.md#[tostringtag])
- [size](List.md#size)

### Methods

- [[iterator]](List.md#[iterator])
- [at](List.md#at)
- [clear](List.md#clear)
- [delete](List.md#delete)
- [entries](List.md#entries)
- [fill](List.md#fill)
- [forEach](List.md#foreach)
- [has](List.md#has)
- [keys](List.md#keys)
- [pop](List.md#pop)
- [push](List.md#push)
- [set](List.md#set)
- [shift](List.md#shift)
- [slice](List.md#slice)
- [splice](List.md#splice)
- [unshift](List.md#unshift)
- [values](List.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/list.d.ts:124](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L124)

___

### at

▸ **at**(`index`): `undefined` \| `V`

Retrieves the element at the specified index in the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the element to retrieve. |

#### Returns

`undefined` \| `V`

The element at the specified index, or `undefined` if the index is out of bounds.

#### Defined in

[types/list.d.ts:20](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L20)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L24)

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

#### Defined in

[types/list.d.ts:30](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L30)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `V`]\>

An iterable iterator for the entries of the collection.

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L32)

___

### fill

▸ **fill**(`value`, `start?`, `end?`): `this`

Fills the list with the specified value from a start index (inclusive)
to an end index (exclusive).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to fill the list with. |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

`this`

The instance of the list for chaining.

#### Defined in

[types/list.d.ts:42](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L42)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `number`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[forEach](Collection.md#foreach)

#### Defined in

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L41)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a specific element exists within the list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to locate. |

#### Returns

`boolean`

`true` if the value exists, `false` otherwise.

#### Defined in

[types/list.d.ts:51](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L51)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L52)

___

### pop

▸ **pop**(): `undefined` \| `V`

Removes and returns the last element of the list.

#### Returns

`undefined` \| `V`

The last element of the list, or `undefined` if the list is empty.

#### Defined in

[types/list.d.ts:58](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L58)

___

### push

▸ **push**(`...values`): `number`

Adds one or more elements to the end of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add. |

#### Returns

`number`

The new length of the list.

#### Defined in

[types/list.d.ts:68](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L68)

___

### set

▸ **set**(`index`, `value`): `undefined` \| `V`

Replaces the element at the specified index with a new value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the element to replace. |
| `value` | `V` | The new value to set at the specified index. |

#### Returns

`undefined` \| `V`

The previous value at the index if replaced, otherwise `undefined`.

#### Defined in

[types/list.d.ts:78](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L78)

___

### shift

▸ **shift**(): `undefined` \| `V`

Removes and returns the first element of the list.
Subsequent elements are shifted one position towards the start of the list.

#### Returns

`undefined` \| `V`

The first element of the list, or `undefined` if the list is empty.

#### Defined in

[types/list.d.ts:86](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L86)

___

### slice

▸ **slice**(`start?`, `end?`): [`List`](List.md)\<`V`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`List`](List.md)\<`V`\>

A new list containing the specified elements.

#### Defined in

[types/list.d.ts:97](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L97)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`List`](List.md)\<`V`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `V`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`List`](List.md)\<`V`\>

A new list containing the deleted elements, if any.

#### Defined in

[types/list.d.ts:109](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L109)

___

### unshift

▸ **unshift**(`...values`): `number`

Adds one or more elements to the beginning of the list
and returns the new list length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add to the beginning of the list. |

#### Returns

`number`

The new length of the list.

#### Defined in

[types/list.d.ts:119](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/list.d.ts#L119)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`V`\>

An iterable iterator for the values of the collection.

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/442493d/src/types/collection.d.ts#L60)
