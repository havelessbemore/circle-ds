[circle-ds](../README.md) / [Exports](../modules.md) / Deque

# Interface: Deque\<V\>

## Type parameters

| Name |
| :--- |
| `V`  |

## Hierarchy

- [`Queue`](Queue.md)\<`V`\>

- [`Stack`](Stack.md)\<`V`\>

  ↳ **`Deque`**

## Implemented by

- [`CircularLinkedDeque`](../classes/CircularLinkedDeque.md)

## Table of contents

### Properties

- [size](Deque.md#size)

### Methods

- [[iterator]](Deque.md#[iterator])
- [clear](Deque.md#clear)
- [entries](Deque.md#entries)
- [first](Deque.md#first)
- [forEach](Deque.md#foreach)
- [front](Deque.md#front)
- [has](Deque.md#has)
- [keys](Deque.md#keys)
- [last](Deque.md#last)
- [pop](Deque.md#pop)
- [push](Deque.md#push)
- [shift](Deque.md#shift)
- [top](Deque.md#top)
- [unshift](Deque.md#unshift)
- [values](Deque.md#values)

## Properties

### size

• **size**: `number`

#### Inherited from

[Stack](Stack.md).[size](Stack.md#size)

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L13)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[[iterator]](Stack.md#[iterator])

#### Defined in

[types/queue.ts:9](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L9)

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Stack](Stack.md).[clear](Stack.md#clear)

#### Defined in

[types/collection.ts:6](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L6)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Stack](Stack.md).[entries](Stack.md#entries)

#### Defined in

[types/collection.ts:7](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L7)

---

### first

▸ **first**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[first](Queue.md#first)

#### Defined in

[types/queue.ts:4](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L4)

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

[Stack](Stack.md).[forEach](Stack.md#foreach)

#### Defined in

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L8)

---

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[front](Queue.md#front)

#### Defined in

[types/queue.ts:5](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L5)

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

[Stack](Stack.md).[has](Stack.md#has)

#### Defined in

[types/queue.ts:6](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L6)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Stack](Stack.md).[keys](Stack.md#keys)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L12)

---

### last

▸ **last**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[last](Stack.md#last)

#### Defined in

[types/stack.ts:5](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/stack.ts#L5)

---

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[pop](Stack.md#pop)

#### Defined in

[types/stack.ts:6](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/stack.ts#L6)

---

### push

▸ **push**(`...values`): `number`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`number`

#### Inherited from

[Stack](Stack.md).[push](Stack.md#push)

#### Defined in

[types/queue.ts:7](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L7)

---

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[shift](Queue.md#shift)

#### Defined in

[types/queue.ts:8](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/queue.ts#L8)

---

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[top](Stack.md#top)

#### Defined in

[types/stack.ts:9](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/stack.ts#L9)

---

### unshift

▸ **unshift**(`...values`): `number`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`number`

#### Defined in

[types/deque.ts:5](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/deque.ts#L5)

---

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[values](Stack.md#values)

#### Defined in

[types/collection.ts:14](https://github.com/havelessbemore/circle-ds/blob/8ac6051/src/types/collection.ts#L14)
