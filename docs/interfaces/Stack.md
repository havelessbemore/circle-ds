[circle-ds](../README.md) / [Exports](../modules.md) / Stack

# Interface: Stack\<V\>

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`Stack`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularLinkedStack`](../classes/CircularLinkedStack.md)
- [`CircularStack`](../classes/CircularStack.md)

## Table of contents

### Properties

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

## Properties

### size

• **size**: `number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L13)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/stack.ts:8](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L8)

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.ts:6](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L6)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.ts:7](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L7)

---

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

#### Parameters

| Name         | Type                                                            |
| :----------- | :-------------------------------------------------------------- |
| `callbackfn` | (`value`: `V`, `key`: `number`, `collection`: `this`) => `void` |
| `thisArg?`   | `unknown`                                                       |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[forEach](Collection.md#foreach)

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L8)

---

### has

▸ **has**(`value`): `boolean`

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `V`  |

#### Returns

`boolean`

#### Defined in

[types/stack.ts:4](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L4)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L12)

---

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.ts:5](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L5)

---

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.ts:6](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L6)

---

### push

▸ **push**(`...values`): `number`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`number`

#### Defined in

[types/stack.ts:7](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L7)

---

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/stack.ts:9](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/stack.ts#L9)

---

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.ts:14](https://github.com/havelessbemore/circle-ds/blob/e0cc6e8/src/types/collection.ts#L14)
