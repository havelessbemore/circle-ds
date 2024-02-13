[circle-ds](../README.md) / [Exports](../modules.md) / Collection

# Interface: Collection\<K, V\>

## Type parameters

| Name |
| :------ |
| `K` |
| `V` |

## Hierarchy

- **`Collection`**

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

#### Returns

`string`

#### Defined in

[types/collection.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L7)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Defined in

[types/collection.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L6)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[types/collection.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L8)

___

### entries

▸ **entries**(): `IterableIterator`\<[`K`, `V`]\>

#### Returns

`IterableIterator`\<[`K`, `V`]\>

#### Defined in

[types/collection.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L9)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `K`, `collection`: `this`) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Defined in

[types/collection.d.ts:10](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L10)

___

### keys

▸ **keys**(): `IterableIterator`\<`K`\>

#### Returns

`IterableIterator`\<`K`\>

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L14)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/collection.d.ts:15](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L15)
