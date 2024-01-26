[circle-ds](../README.md) / [Exports](../modules.md) / Collection

# Interface: Collection\<V, K\>

## Type parameters

| Name |
| :------ |
| `V` |
| `K` |

## Hierarchy

- **`Collection`**

  ↳ [`Queue`](Queue.md)

  ↳ [`Stack`](Stack.md)

## Implemented by

- [`CircularView`](../classes/CircularView.md)

## Table of contents

### Properties

- [capacity](Collection.md#capacity)
- [size](Collection.md#size)

### Methods

- [[iterator]](Collection.md#[iterator])
- [clear](Collection.md#clear)
- [entries](Collection.md#entries)
- [forEach](Collection.md#foreach)
- [has](Collection.md#has)
- [keys](Collection.md#keys)
- [values](Collection.md#values)

## Properties

### capacity

• **capacity**: `number`

#### Defined in

[types/collection.ts:10](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L10)

___

### size

• **size**: `number`

#### Defined in

[types/collection.ts:11](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L11)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L13)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[types/collection.ts:2](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L2)

___

### entries

▸ **entries**(): `IterableIterator`\<[`K`, `V`]\>

#### Returns

`IterableIterator`\<[`K`, `V`]\>

#### Defined in

[types/collection.ts:3](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L3)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `number`, `collection`: `this`) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Defined in

[types/collection.ts:4](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L4)

___

### has

▸ **has**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`boolean`

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L8)

___

### keys

▸ **keys**(): `IterableIterator`\<`K`\>

#### Returns

`IterableIterator`\<`K`\>

#### Defined in

[types/collection.ts:9](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L9)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L12)
