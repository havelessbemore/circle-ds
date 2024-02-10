[circle-ds](../README.md) / [Exports](../modules.md) / Collection

# Interface: Collection\<K, V\>

## Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

## Hierarchy

- **`Collection`**

  ↳ [`Queue`](Queue.md)

  ↳ [`Stack`](Stack.md)

## Implemented by

- [`CircularMap`](../classes/CircularMap.md)
- [`CircularSet`](../classes/CircularSet.md)

## Table of contents

### Properties

- [size](Collection.md#size)

### Methods

- [clear](Collection.md#clear)
- [entries](Collection.md#entries)
- [forEach](Collection.md#foreach)
- [keys](Collection.md#keys)
- [values](Collection.md#values)

## Properties

### size

• **size**: `number`

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L13)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[types/collection.ts:6](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L6)

---

### entries

▸ **entries**(): `IterableIterator`\<[`K`, `V`]\>

#### Returns

`IterableIterator`\<[`K`, `V`]\>

#### Defined in

[types/collection.ts:7](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L7)

---

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

#### Parameters

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `callbackfn` | (`value`: `V`, `key`: `K`, `collection`: `this`) => `void` |
| `thisArg?`   | `unknown`                                                  |

#### Returns

`void`

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L8)

---

### keys

▸ **keys**(): `IterableIterator`\<`K`\>

#### Returns

`IterableIterator`\<`K`\>

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L12)

---

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/collection.ts:14](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L14)
