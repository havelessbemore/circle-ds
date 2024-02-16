[circle-ds](../README.md) / [Exports](../modules.md) / Stack

# Interface: Stack\<V\>

Represents a generic collection of key-value pairs with various utility methods
to manipulate and interact with the collection. This interface abstracts common
functionality found in data structures like deques, lists, maps, queues, etc.

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

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/stack.d.ts:8](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L8)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L24)

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

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L32)

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

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L41)

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

[types/stack.d.ts:4](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L4)

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

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L52)

___

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:5](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L5)

___

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:6](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L6)

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

[types/stack.d.ts:7](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L7)

___

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.d.ts:9](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/stack.d.ts#L9)

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

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/a2fd13f/src/types/collection.d.ts#L60)
