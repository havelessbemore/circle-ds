[circle-ds](../README.md) / [Exports](../modules.md) / LinkedList

# Class: LinkedList\<T\>

Represents a generic list collection of elements, allowing for indexed
access, modification, and iteration. This interface extends the
`Collection` interface by adding list-specific operations.

The `List` interface supports both sequential and random access to elements,
making it suitable for a wide range of applications that require manipulation
of collections.

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`List`](../interfaces/List.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](LinkedList.md#constructor)

### Accessors

- [[toStringTag]](LinkedList.md#[tostringtag])
- [size](LinkedList.md#size)

### Methods

- [[iterator]](LinkedList.md#[iterator])
- [at](LinkedList.md#at)
- [clear](LinkedList.md#clear)
- [delete](LinkedList.md#delete)
- [entries](LinkedList.md#entries)
- [fill](LinkedList.md#fill)
- [forEach](LinkedList.md#foreach)
- [has](LinkedList.md#has)
- [keys](LinkedList.md#keys)
- [pop](LinkedList.md#pop)
- [push](LinkedList.md#push)
- [set](LinkedList.md#set)
- [shift](LinkedList.md#shift)
- [slice](LinkedList.md#slice)
- [splice](LinkedList.md#splice)
- [unshift](LinkedList.md#unshift)
- [values](LinkedList.md#values)

## Constructors

### constructor

• **new LinkedList**\<`T`\>(): [`LinkedList`](LinkedList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`LinkedList`](LinkedList.md)\<`T`\>

#### Defined in

[std/linkedList.ts:25](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L25)

• **new LinkedList**\<`T`\>(`values`): [`LinkedList`](LinkedList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Iterable`\<`T`\> |

#### Returns

[`LinkedList`](LinkedList.md)\<`T`\>

#### Defined in

[std/linkedList.ts:26](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L26)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

List.[toStringTag]

#### Defined in

[std/linkedList.ts:38](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L38)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

List.size

#### Defined in

[std/linkedList.ts:34](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L34)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[List](../interfaces/List.md).[[iterator]](../interfaces/List.md#[iterator])

#### Defined in

[std/linkedList.ts:208](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L208)

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

- The element at the specified index, or `undefined` if the index is out of bounds.

#### Implementation of

[List](../interfaces/List.md).[at](../interfaces/List.md#at)

#### Defined in

[std/linkedList.ts:42](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L42)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[List](../interfaces/List.md).[clear](../interfaces/List.md#clear)

#### Defined in

[std/linkedList.ts:47](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L47)

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

- `true` if the element was successfully deleted, `false` otherwise.

#### Implementation of

[List](../interfaces/List.md).[delete](../interfaces/List.md#delete)

#### Defined in

[std/linkedList.ts:54](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L54)

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

[std/linkedList.ts:63](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L63)

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

- The instance of the list for chaining.

#### Implementation of

[List](../interfaces/List.md).[fill](../interfaces/List.md#fill)

#### Defined in

[std/linkedList.ts:71](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L71)

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

[std/linkedList.ts:92](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L92)

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

- `true` if the value exists, `false` otherwise.

#### Implementation of

[List](../interfaces/List.md).[has](../interfaces/List.md#has)

#### Defined in

[std/linkedList.ts:103](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L103)

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

[std/linkedList.ts:115](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L115)

___

### pop

▸ **pop**(): `undefined` \| `T`

Removes and returns the last element of the list.

#### Returns

`undefined` \| `T`

- The last element of the list, or `undefined` if the list is empty.

#### Implementation of

[List](../interfaces/List.md).[pop](../interfaces/List.md#pop)

#### Defined in

[std/linkedList.ts:121](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L121)

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

- The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[push](../interfaces/List.md#push)

#### Defined in

[std/linkedList.ts:130](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L130)

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

- The previous value at the index if replaced, otherwise `undefined`.

#### Implementation of

[List](../interfaces/List.md).[set](../interfaces/List.md#set)

#### Defined in

[std/linkedList.ts:139](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L139)

___

### shift

▸ **shift**(): `undefined` \| `T`

Removes and returns the first element of the list.
Subsequent elements are shifted one position towards the start of the list.

#### Returns

`undefined` \| `T`

- The first element of the list, or `undefined` if the list is empty.

#### Implementation of

[List](../interfaces/List.md).[shift](../interfaces/List.md#shift)

#### Defined in

[std/linkedList.ts:150](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L150)

___

### slice

▸ **slice**(`start?`, `end?`): [`LinkedList`](LinkedList.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`LinkedList`](LinkedList.md)\<`T`\>

- A new list containing the specified elements.

#### Implementation of

[List](../interfaces/List.md).[slice](../interfaces/List.md#slice)

#### Defined in

[std/linkedList.ts:159](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L159)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`LinkedList`](LinkedList.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`LinkedList`](LinkedList.md)\<`T`\>

- A new list containing the deleted elements, if any.

#### Implementation of

[List](../interfaces/List.md).[splice](../interfaces/List.md#splice)

#### Defined in

[std/linkedList.ts:180](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L180)

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

- The new length of the list.

#### Implementation of

[List](../interfaces/List.md).[unshift](../interfaces/List.md#unshift)

#### Defined in

[std/linkedList.ts:212](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L212)

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

[std/linkedList.ts:221](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/linkedList.ts#L221)
