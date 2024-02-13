[circle-ds](../README.md) / [Exports](../modules.md) / Stack

# Interface: Stack\<V\>

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`Stack`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularLinkedStack`](../classes/CircularLinkedStack.md)
- [`CircularStack`](../classes/CircularStack.md)

## Table of contents

### Accessors

- [[toStringTag]](Stack.md#[tostringtag])
- [size](Stack.md#size)

### Methods

- [[iterator]](Stack.md#[iterator])
- [clear](Stack.md#clear)
- [entries](Stack.md#entries)
- [forEach](Stack.md#foreach)
- [has](Stack.md#has)
- [keys](Stack.md#keys)
- [last](Stack.md#last)
- [pop](Stack.md#pop)
- [push](Stack.md#push)
- [top](Stack.md#top)
- [values](Stack.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L7)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L6)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/stack.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L8)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L8)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L9)

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

[types/collection.d.ts:10](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L10)

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

[types/stack.d.ts:4](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L4)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L14)

___

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L5)

___

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L6)

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

[types/stack.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L7)

___

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/stack.d.ts#L9)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.d.ts:15](https://github.com/havelessbemore/circle-ds/blob/c874f95/src/types/collection.d.ts#L15)
