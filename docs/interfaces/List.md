[circle-ds](../README.md) / [Exports](../modules.md) / List

# Interface: List\<V\>

Represents a generic collection of key-value pairs with various utility methods
to manipulate and interact with the collection. This interface abstracts common
functionality found in data structures like deques, lists, maps, queues, etc.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`List`**

## Implemented by

- [`LinkedList`](../classes/LinkedList.md)
- [`SkipList`](../classes/SkipList.md)

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

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/list.d.ts:15](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L15)

___

### at

▸ **at**(`index`): `undefined` \| `V`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`undefined` \| `V`

#### Defined in

[types/list.d.ts:4](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L4)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L24)

___

### delete

▸ **delete**(`index`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`boolean`

#### Defined in

[types/list.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L5)

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

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L32)

___

### fill

▸ **fill**(`value`, `start?`, `end?`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |
| `start?` | `number` |
| `end?` | `number` |

#### Returns

`this`

#### Defined in

[types/list.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L6)

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

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L41)

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

[types/list.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L7)

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

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L52)

___

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/list.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L8)

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

[types/list.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L9)

___

### set

▸ **set**(`index`, `value`): `undefined` \| `V`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `value` | `V` |

#### Returns

`undefined` \| `V`

#### Defined in

[types/list.d.ts:10](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L10)

___

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/list.d.ts:11](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L11)

___

### slice

▸ **slice**(`start?`, `end?`): [`List`](List.md)\<`V`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |

#### Returns

[`List`](List.md)\<`V`\>

#### Defined in

[types/list.d.ts:12](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L12)

___

### splice

▸ **splice**(`start`, `deleteCount?`, `...items`): [`List`](List.md)\<`V`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `deleteCount?` | `number` |
| `...items` | `V`[] |

#### Returns

[`List`](List.md)\<`V`\>

#### Defined in

[types/list.d.ts:13](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L13)

___

### unshift

▸ **unshift**(`...values`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `V`[] |

#### Returns

`number`

#### Defined in

[types/list.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/list.d.ts#L14)

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

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L60)
