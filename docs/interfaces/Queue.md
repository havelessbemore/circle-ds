[circle-ds](../README.md) / [Exports](../modules.md) / Queue

# Interface: Queue\<V\>

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- [`Collection`](Collection.md)\<`V`, `number`\>

  ↳ **`Queue`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircleQueue`](../classes/CircleQueue.md)

## Table of contents

### Properties

- [capacity](Queue.md#capacity)
- [size](Queue.md#size)

### Methods

- [[iterator]](Queue.md#[iterator])
- [clear](Queue.md#clear)
- [entries](Queue.md#entries)
- [forEach](Queue.md#foreach)
- [front](Queue.md#front)
- [has](Queue.md#has)
- [keys](Queue.md#keys)
- [push](Queue.md#push)
- [shift](Queue.md#shift)
- [values](Queue.md#values)

## Properties

### capacity

• **capacity**: `number`

#### Inherited from

[Collection](Collection.md).[capacity](Collection.md#capacity)

#### Defined in

[types/collection.ts:10](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L10)

---

### size

• **size**: `number`

#### Inherited from

[Collection](Collection.md).[size](Collection.md#size)

#### Defined in

[types/collection.ts:11](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L11)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[[iterator]](Collection.md#[iterator])

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L13)

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.ts:2](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L2)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.ts:3](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L3)

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

[types/collection.ts:4](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L4)

---

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.ts:24](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/queue.ts#L24)

---

### has

▸ **has**(`value`): `boolean`

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `V`  |

#### Returns

`boolean`

#### Inherited from

[Collection](Collection.md).[has](Collection.md#has)

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L8)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.ts:9](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L9)

---

### push

▸ **push**(`...values`): `void`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`void`

#### Defined in

[types/queue.ts:25](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/queue.ts#L25)

---

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/queue.ts:26](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/queue.ts#L26)

---

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/e529369/src/types/collection.ts#L12)
