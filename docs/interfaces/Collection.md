[circle-ds](../README.md) / [Exports](../modules.md) / Collection

# Interface: Collection\<K, V\>

Represents a generic collection of key-value pairs with various utility methods
to manipulate and interact with the collection. This interface abstracts common
functionality found in data structures like deques, lists, maps, queues, etc.

## Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of keys maintained by this collection. |
| `V` | The type of mapped values. |

## Hierarchy

- **`Collection`**

  ↳ [`List`](List.md)

  ↳ [`Queue`](Queue.md)

  ↳ [`Stack`](Stack.md)

## Implemented by

- [`CircularMap`](../classes/CircularMap.md)
- [`CircularSet`](../classes/CircularSet.md)

## Table of contents

### Accessors

- [[toStringTag]](Collection.md#[tostringtag])
- [size](Collection.md#size)

### Methods

- [clear](Collection.md#clear)
- [entries](Collection.md#entries)
- [forEach](Collection.md#foreach)
- [keys](Collection.md#keys)
- [values](Collection.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Defined in

[types/collection.d.ts:22](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L22)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Defined in

[types/collection.d.ts:17](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L17)

## Methods

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Defined in

[types/collection.d.ts:27](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L27)

___

### entries

▸ **entries**(): `IterableIterator`\<[`K`, `V`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`K`, `V`]\>

An iterable iterator for the entries of the collection.

#### Defined in

[types/collection.d.ts:35](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L35)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `K`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Defined in

[types/collection.d.ts:44](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L44)

___

### keys

▸ **keys**(): `IterableIterator`\<`K`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`K`\>

An iterable iterator for the keys of the collection.

#### Defined in

[types/collection.d.ts:55](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L55)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`V`\>

An iterable iterator for the values of the collection.

#### Defined in

[types/collection.d.ts:63](https://github.com/havelessbemore/circle-ds/blob/8db0c0d/src/types/collection.d.ts#L63)
