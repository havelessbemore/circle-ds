[circle-ds](../README.md) / Deque

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

- [`CircularDeque`](../classes/CircularDeque.md)

## Table of contents

### Properties

- [capacity](Deque.md#capacity)
- [size](Deque.md#size)

### Methods

- [[iterator]](Deque.md#[iterator])
- [back](Deque.md#back)
- [bottom](Deque.md#bottom)
- [clear](Deque.md#clear)
- [entries](Deque.md#entries)
- [forEach](Deque.md#foreach)
- [front](Deque.md#front)
- [has](Deque.md#has)
- [keys](Deque.md#keys)
- [pop](Deque.md#pop)
- [push](Deque.md#push)
- [shift](Deque.md#shift)
- [top](Deque.md#top)
- [unshift](Deque.md#unshift)
- [values](Deque.md#values)

## Properties

### capacity

• **capacity**: `number`

#### Inherited from

[Stack](Stack.md).[capacity](Stack.md#capacity)

#### Defined in

[types/collection.ts:10](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L10)

---

### size

• **size**: `number`

#### Inherited from

[Stack](Stack.md).[size](Stack.md#size)

#### Defined in

[types/collection.ts:11](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L11)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[[iterator]](Stack.md#[iterator])

#### Defined in

[types/collection.ts:13](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L13)

---

### back

▸ **back**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/deque.ts:5](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/deque.ts#L5)

---

### bottom

▸ **bottom**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Defined in

[types/deque.ts:6](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/deque.ts#L6)

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Inherited from

[Stack](Stack.md).[clear](Stack.md#clear)

#### Defined in

[types/collection.ts:2](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L2)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

#### Returns

`IterableIterator`\<[`number`, `V`]\>

#### Inherited from

[Stack](Stack.md).[entries](Stack.md#entries)

#### Defined in

[types/collection.ts:3](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L3)

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

[types/collection.ts:4](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L4)

---

### front

▸ **front**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[front](Queue.md#front)

#### Defined in

[types/queue.ts:24](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/queue.ts#L24)

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

[types/collection.ts:8](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L8)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

[Stack](Stack.md).[keys](Stack.md#keys)

#### Defined in

[types/collection.ts:9](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L9)

---

### pop

▸ **pop**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[pop](Stack.md#pop)

#### Defined in

[types/stack.ts:4](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/stack.ts#L4)

---

### push

▸ **push**(`...values`): `void`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`void`

#### Inherited from

[Stack](Stack.md).[push](Stack.md#push)

#### Defined in

[types/queue.ts:25](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/queue.ts#L25)

---

### shift

▸ **shift**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Queue](Queue.md).[shift](Queue.md#shift)

#### Defined in

[types/queue.ts:26](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/queue.ts#L26)

---

### top

▸ **top**(): `undefined` \| `V`

#### Returns

`undefined` \| `V`

#### Inherited from

[Stack](Stack.md).[top](Stack.md#top)

#### Defined in

[types/stack.ts:6](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/stack.ts#L6)

---

### unshift

▸ **unshift**(`...values`): `void`

#### Parameters

| Name        | Type  |
| :---------- | :---- |
| `...values` | `V`[] |

#### Returns

`void`

#### Defined in

[types/deque.ts:7](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/deque.ts#L7)

---

### values

▸ **values**(): `IterableIterator`\<`V`\>

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

[Stack](Stack.md).[values](Stack.md#values)

#### Defined in

[types/collection.ts:12](https://github.com/havelessbemore/circle-ds/blob/b227384/src/types/collection.ts#L12)
