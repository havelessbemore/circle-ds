[circle-ds](../README.md) / [Exports](../modules.md) / Queue

# Interface: Queue\<V\>

Represents a generic collection of key-value pairs with various utility methods
to manipulate and interact with the collection. This interface abstracts common
functionality found in data structures like deques, lists, maps, queues, etc.

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

### Accessors

- [[toStringTag]](Queue.md#[tostringtag])
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

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/queue.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L9)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L24)

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

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L32)

___

### first

▸ **first**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.d.ts:4](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L4)

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

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L41)

___

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L5)

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

[types/queue.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L6)

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

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L52)

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

[types/queue.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L7)

___

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/queue.d.ts#L8)

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

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/f0ada2f/src/types/collection.d.ts#L60)
