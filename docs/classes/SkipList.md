[circle-ds](../README.md) / [Exports](../modules.md) / SkipList

# Class: SkipList\<T\>

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

- [constructor](SkipList.md#constructor)

### Accessors

- [[toStringTag]](SkipList.md#[tostringtag])
- [levels](SkipList.md#levels)
- [maxLevel](SkipList.md#maxlevel)
- [p](SkipList.md#p)
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

## Constructors

### constructor

• **new SkipList**\<`T`\>(): [`SkipList`](SkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

#### Defined in

[std/skipList.ts:44](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L44)

• **new SkipList**\<`T`\>(`values`): [`SkipList`](SkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Iterable`\<`T`\> |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

#### Defined in

[std/skipList.ts:45](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L45)

• **new SkipList**\<`T`\>(`config`): [`SkipList`](SkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SkipListConfig`](../interfaces/SkipListConfig.md) |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

#### Defined in

[std/skipList.ts:46](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L46)

• **new SkipList**\<`T`\>(`values`, `config`): [`SkipList`](SkipList.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Iterable`\<`T`\> |
| `config` | [`SkipListConfig`](../interfaces/SkipListConfig.md) |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

#### Defined in

[std/skipList.ts:47](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L47)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Implementation of

List.[toStringTag]

#### Defined in

[std/skipList.ts:79](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L79)

___

### levels

• `get` **levels**(): `number`

#### Returns

`number`

#### Defined in

[std/skipList.ts:63](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L63)

___

### maxLevel

• `get` **maxLevel**(): `number`

#### Returns

`number`

#### Defined in

[std/skipList.ts:67](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L67)

• `set` **maxLevel**(`maxLevel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxLevel` | `number` |

#### Returns

`void`

#### Defined in

[std/skipList.ts:83](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L83)

___

### p

• `get` **p**(): `number`

#### Returns

`number`

#### Defined in

[std/skipList.ts:71](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L71)

• `set` **p**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `number` |

#### Returns

`void`

#### Defined in

[std/skipList.ts:101](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L101)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Implementation of

List.size

#### Defined in

[std/skipList.ts:75](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L75)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Returns the default iterator through the list's elements.

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

[List](../interfaces/List.md).[[iterator]](../interfaces/List.md#[iterator])

#### Defined in

[std/skipList.ts:297](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L297)

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

[std/skipList.ts:114](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L114)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Implementation of

[List](../interfaces/List.md).[clear](../interfaces/List.md#clear)

#### Defined in

[std/skipList.ts:119](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L119)

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

[std/skipList.ts:128](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L128)

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

[std/skipList.ts:137](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L137)

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

[std/skipList.ts:145](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L145)

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

[std/skipList.ts:166](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L166)

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

[std/skipList.ts:177](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L177)

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

[std/skipList.ts:189](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L189)

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

[std/skipList.ts:195](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L195)

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

[std/skipList.ts:207](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L207)

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

[std/skipList.ts:223](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L223)

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

[std/skipList.ts:234](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L234)

___

### slice

▸ **slice**(`start?`, `end?`): [`SkipList`](SkipList.md)\<`T`\>

Creates a shallow copy of the list from start index (inclusive)
to end index (exclusive) into a new list. Does not modify the existing list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The start index. Defaults to 0. |
| `end?` | `number` | The end index. Defaults to the list's length. |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

- A new list containing the specified elements.

#### Implementation of

[List](../interfaces/List.md).[slice](../interfaces/List.md#slice)

#### Defined in

[std/skipList.ts:243](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L243)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`SkipList`](SkipList.md)\<`T`\>

Changes the contents of the list by removing existing elements
and/or adding new elements at a given index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index at which to start changing the list. |
| `deleteCount?` | `number` | The number of elements to remove from the list. Defaults to 0. |
| `...items` | `T`[] | The elements to add to the list beginning at start index. Defaults to []. |

#### Returns

[`SkipList`](SkipList.md)\<`T`\>

- A new list containing the deleted elements, if any.

#### Implementation of

[List](../interfaces/List.md).[splice](../interfaces/List.md#splice)

#### Defined in

[std/skipList.ts:264](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L264)

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

[std/skipList.ts:301](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L301)

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

[std/skipList.ts:316](https://github.com/havelessbemore/circle-ds/blob/b475bd2/src/std/skipList.ts#L316)
