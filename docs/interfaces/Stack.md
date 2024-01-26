[circle-ds](../README.md) / [Exports](../modules.md) / Stack

# Interface: Stack\<V\>

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`V`, `number`\>

  ↳ **`Stack`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularStack`](../classes/CircularStack.md)

## Table of contents

### Properties

- [capacity](Stack.md#capacity)
- [size](Stack.md#size)

### Methods

- [[iterator]](Stack.md#[iterator])
- [clear](Stack.md#clear)
- [entries](Stack.md#entries)
- [forEach](Stack.md#foreach)
- [has](Stack.md#has)
- [keys](Stack.md#keys)
- [pop](Stack.md#pop)
- [push](Stack.md#push)
- [top](Stack.md#top)
- [values](Stack.md#values)

## Properties

### capacity

• **capacity**: `number`

#### Inherited from

[Collection](Collection.md).[capacity](Collection.md#capacity)

#### Defined in

[types/collection.ts:10](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L10)

___

### size

• **size**: `number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[types/collection.ts:11](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L11)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[[iterator]](Collection.md#[iterator])

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L13)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.ts:2](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L2)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

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

#### Inherited from

[Collection](Collection.md).[forEach](Collection.md#foreach)

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

#### Inherited from

[Collection](Collection.md).[has](Collection.md#has)

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L8)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.ts:9](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L9)

___

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.ts:4](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/stack.ts#L4)

___

### push

▸ **push**(`...values`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `V`[] |

#### Returns

`void`

#### Defined in

[types/stack.ts:5](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/stack.ts#L5)

___

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.ts:6](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/stack.ts#L6)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/8e638f7/src/types/collection.ts#L12)
