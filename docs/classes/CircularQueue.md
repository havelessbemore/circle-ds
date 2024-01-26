[circle-ds](../README.md) / [Exports](../modules.md) / CircularQueue

# Class: CircularQueue\<T\>

A circular queue is similar to a traditional queue, but uses a fixed-size,
circular buffer. When the queue reaches its maximum capacity and a new
element is added, the oldest is discarded, thus maintaining its size.

This structure efficiently utilizes memory for applications where only the
most recent additions are of interest and older data can be discarded.

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :--- |
| `T`  |

## Hierarchy

- [`CircularView`](CircularView.md)\<`T`\>

  ↳ **`CircularQueue`**

  ↳↳ [`CircularDeque`](CircularDeque.md)

## Implements

- [`Queue`](../interfaces/Queue.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularQueue.md#constructor)

### Properties

- [\_size](CircularQueue.md#_size)
- [head](CircularQueue.md#head)
- [tail](CircularQueue.md#tail)
- [vals](CircularQueue.md#vals)

### Accessors

- [capacity](CircularQueue.md#capacity)
- [size](CircularQueue.md#size)

### Methods

- [[iterator]](CircularQueue.md#[iterator])
- [clear](CircularQueue.md#clear)
- [entries](CircularQueue.md#entries)
- [forEach](CircularQueue.md#foreach)
- [front](CircularQueue.md#front)
- [grow](CircularQueue.md#grow)
- [has](CircularQueue.md#has)
- [keys](CircularQueue.md#keys)
- [push](CircularQueue.md#push)
- [shift](CircularQueue.md#shift)
- [shrink](CircularQueue.md#shrink)
- [toInt](CircularQueue.md#toint)
- [values](CircularQueue.md#values)
- [from](CircularQueue.md#from)
- [of](CircularQueue.md#of)

## Constructors

### constructor

• **new CircularQueue**\<`T`\>(): [`CircularQueue`](CircularQueue.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircularView.capacity](CircularView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:38](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L38)

• **new CircularQueue**\<`T`\>(`capacity`): [`CircularQueue`](CircularQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:42](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L42)

• **new CircularQueue**\<`T`\>(`items`): [`CircularQueue`](CircularQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:46](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L46)

• **new CircularQueue**\<`T`\>(`...items`): [`CircularQueue`](CircularQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircularQueue`](CircularQueue.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:50](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L50)

## Properties

### \_size

• `Protected` **\_size**: `number`

The number of elements in the collection.

#### Inherited from

[CircularView](CircularView.md).[\_size](CircularView.md#_size)

#### Defined in

[circular/circularView.ts:21](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L21)

---

### head

• `Protected` **head**: `number`

The index representing the first element in the collection.

#### Inherited from

[CircularView](CircularView.md).[head](CircularView.md#head)

#### Defined in

[circular/circularView.ts:15](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L15)

---

### tail

• `Protected` **tail**: `number`

The index one more than the last element in the collection.

#### Inherited from

[CircularView](CircularView.md).[tail](CircularView.md#tail)

#### Defined in

[circular/circularView.ts:27](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L27)

---

### vals

• `Protected` **vals**: (`undefined` \| `T`)[]

The values in the collection.

#### Inherited from

[CircularView](CircularView.md).[vals](CircularView.md#vals)

#### Defined in

[circular/circularView.ts:33](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L33)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Queue](../interfaces/Queue.md).[capacity](../interfaces/Queue.md#capacity)

#### Inherited from

CircularView.capacity

#### Defined in

[circular/circularView.ts:109](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L109)

• `set` **capacity**(`newCapacity`): `void`

Sets the maximum number of elements that can be stored.

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `newCapacity` | `number` |

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[capacity](../interfaces/Queue.md#capacity)

#### Inherited from

CircularView.capacity

#### Defined in

[circular/circularView.ts:116](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[size](../interfaces/Queue.md#size)

#### Inherited from

CircularView.size

#### Defined in

[circular/circularView.ts:141](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L141)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Queue](../interfaces/Queue.md).[[iterator]](../interfaces/Queue.md#[iterator])

#### Inherited from

[CircularView](CircularView.md).[[iterator]](CircularView.md#[iterator])

#### Defined in

[circular/circularView.ts:226](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L226)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[clear](../interfaces/Queue.md#clear)

#### Inherited from

[CircularView](CircularView.md).[clear](CircularView.md#clear)

#### Defined in

[circular/circularView.ts:148](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L148)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Iterate through the collection's entries.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Queue](../interfaces/Queue.md).[entries](../interfaces/Queue.md#entries)

#### Inherited from

[CircularView](CircularView.md).[entries](CircularView.md#entries)

#### Defined in

[circular/circularView.ts:162](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L162)

---

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each element in the collection.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Parameters

| Name         | Type                                                              | Description                                                                                                    |
| :----------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `callbackfn` | (`value`: `T`, `index`: `number`, `collection`: `this`) => `void` | A function that accepts up to three arguments. It is called once per element.                                  |
| `thisArg?`   | `unknown`                                                         | An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used. |

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[forEach](../interfaces/Queue.md#foreach)

#### Inherited from

[CircularView](CircularView.md).[forEach](CircularView.md#foreach)

#### Defined in

[circular/circularView.ts:176](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L176)

---

### front

▸ **front**(): `undefined` \| `T`

Get the element at the front of the queue.

#### Returns

`undefined` \| `T`

the earliest inserted element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[front](../interfaces/Queue.md#front)

#### Defined in

[circular/circularQueue.ts:20](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularQueue.ts#L20)

---

### grow

▸ **grow**(`newCapacity`): `void`

Grow capacity.

#### Parameters

| Name          | Type     | Description      |
| :------------ | :------- | :--------------- |
| `newCapacity` | `number` | the new capacity |

#### Returns

`void`

#### Inherited from

[CircularView](CircularView.md).[grow](CircularView.md#grow)

#### Defined in

[circular/circularView.ts:261](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L261)

---

### has

▸ **has**(`value`): `boolean`

Determines whether a given element is in the collection.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Parameters

| Name    | Type | Description               |
| :------ | :--- | :------------------------ |
| `value` | `T`  | The element to search for |

#### Returns

`boolean`

a boolean indicating if `value` was found or not

#### Implementation of

[Queue](../interfaces/Queue.md).[has](../interfaces/Queue.md#has)

#### Inherited from

[CircularView](CircularView.md).[has](CircularView.md#has)

#### Defined in

[circular/circularView.ts:196](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L196)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Iterate through the collection's keys.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`number`\>

an iterable of keys.

#### Implementation of

[Queue](../interfaces/Queue.md).[keys](../interfaces/Queue.md#keys)

#### Inherited from

[CircularView](CircularView.md).[keys](CircularView.md#keys)

#### Defined in

[circular/circularView.ts:213](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L213)

---

### push

▸ **push**(`...elems`): `T`[]

Inserts new elements at the end of the queue.

#### Parameters

| Name       | Type  | Description         |
| :--------- | :---- | :------------------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`T`[]

The overwritten elements, if any.

#### Implementation of

[Queue](../interfaces/Queue.md).[push](../interfaces/Queue.md#push)

#### Defined in

[circular/circularQueue.ts:31](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularQueue.ts#L31)

---

### shift

▸ **shift**(): `undefined` \| `T`

Removes the element at the front of the queue.

#### Returns

`undefined` \| `T`

the front element, or `undefined` if empty.

#### Implementation of

[Queue](../interfaces/Queue.md).[shift](../interfaces/Queue.md#shift)

#### Defined in

[circular/circularQueue.ts:60](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularQueue.ts#L60)

---

### shrink

▸ **shrink**(`newCapacity`): `void`

Shrink capacity.

#### Parameters

| Name          | Type     | Description      |
| :------------ | :------- | :--------------- |
| `newCapacity` | `number` | the new capacity |

#### Returns

`void`

#### Inherited from

[CircularView](CircularView.md).[shrink](CircularView.md#shrink)

#### Defined in

[circular/circularView.ts:285](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L285)

---

### toInt

▸ **toInt**(`ext`): `number`

Converts an external index to an internal index

#### Parameters

| Name  | Type     | Description        |
| :---- | :------- | :----------------- |
| `ext` | `number` | The external index |

#### Returns

`number`

The internal index

#### Inherited from

[CircularView](CircularView.md).[toInt](CircularView.md#toint)

#### Defined in

[circular/circularView.ts:251](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L251)

---

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Queue](../interfaces/Queue.md).[values](../interfaces/Queue.md#values)

#### Inherited from

[CircularView](CircularView.md).[values](CircularView.md#values)

#### Defined in

[circular/circularView.ts:237](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L237)

---

### from

▸ **from**\<`T`, `I`\>(`this`, `iterable`): `InstanceType`\<`I`\>

Creates a collection from an iterable object.

#### Type parameters

| Name | Type                                             |
| :--- | :----------------------------------------------- |
| `T`  | `T`                                              |
| `I`  | extends typeof [`CircularView`](CircularView.md) |

#### Parameters

| Name       | Type                                    | Description                                    |
| :--------- | :-------------------------------------- | :--------------------------------------------- |
| `this`     | `I`                                     | -                                              |
| `iterable` | `Iterable`\<`T`\> \| `ArrayLike`\<`T`\> | an iterable object to convert to a collection. |

#### Returns

`InstanceType`\<`I`\>

#### Inherited from

[CircularView](CircularView.md).[from](CircularView.md#from)

#### Defined in

[circular/circularView.ts:81](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L81)

---

### of

▸ **of**\<`I`, `T`\>(`this`, `...elements`): `InstanceType`\<`I`\>

Creates a collection from a variable number of arguments.

#### Type parameters

| Name | Type                                             |
| :--- | :----------------------------------------------- |
| `I`  | extends typeof [`CircularView`](CircularView.md) |
| `T`  | `unknown`                                        |

#### Parameters

| Name          | Type  | Description                                      |
| :------------ | :---- | :----------------------------------------------- |
| `this`        | `I`   | -                                                |
| `...elements` | `T`[] | the elements to be inserted into the collection. |

#### Returns

`InstanceType`\<`I`\>

#### Inherited from

[CircularView](CircularView.md).[of](CircularView.md#of)

#### Defined in

[circular/circularView.ts:96](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L96)
