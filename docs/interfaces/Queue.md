[circle-ds](../README.md) / [Exports](../modules.md) / Queue

# Interface: Queue\<V\>

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`Queue`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularLinkedQueue`](../classes/CircularLinkedQueue.md)
- [`CircularQueue`](../classes/CircularQueue.md)

## Table of contents

### Properties

- [size](Queue.md#size)

### Methods

- [[iterator]](Queue.md#[iterator])
- [clear](Queue.md#clear)
- [entries](Queue.md#entries)
- [first](Queue.md#first)
- [forEach](Queue.md#foreach)
- [front](Queue.md#front)
- [has](Queue.md#has)
- [keys](Queue.md#keys)
- [push](Queue.md#push)
- [shift](Queue.md#shift)
- [values](Queue.md#values)

## Properties

### size

• **size**: `number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L13)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/queue.ts:9](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L9)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.ts:6](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L6)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.ts:7](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L7)

___

### first

▸ **first**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.ts:4](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L4)

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

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L8)

___

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.ts:5](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L5)

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

[types/queue.ts:6](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L6)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L12)

___

### push

▸ **push**(`...values`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `V`[] |

#### Returns

`number`

#### Defined in

[types/queue.ts:7](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L7)

___

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.ts:8](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/queue.ts#L8)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.ts:14](https://github.com/havelessbemore/circle-ds/blob/d546563/src/types/collection.ts#L14)
