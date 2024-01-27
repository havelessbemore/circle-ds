[circle-ds](../README.md) / [Exports](../modules.md) / CircleQueue

# Class: CircleQueue\<T\>

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

- [`CircleView`](CircleView.md)\<`T`\>

  ↳ **`CircleQueue`**

  ↳↳ [`CircleDeque`](CircleDeque.md)

## Implements

- [`Queue`](../interfaces/Queue.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircleQueue.md#constructor)

### Accessors

- [capacity](CircleQueue.md#capacity)
- [size](CircleQueue.md#size)

### Methods

- [[iterator]](CircleQueue.md#[iterator])
- [clear](CircleQueue.md#clear)
- [entries](CircleQueue.md#entries)
- [forEach](CircleQueue.md#foreach)
- [front](CircleQueue.md#front)
- [has](CircleQueue.md#has)
- [keys](CircleQueue.md#keys)
- [push](CircleQueue.md#push)
- [shift](CircleQueue.md#shift)
- [values](CircleQueue.md#values)
- [from](CircleQueue.md#from)
- [of](CircleQueue.md#of)

## Constructors

### constructor

• **new CircleQueue**\<`T`\>(): [`CircleQueue`](CircleQueue.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircleView.capacity](CircleView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircleQueue`](CircleQueue.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:38](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L38)

• **new CircleQueue**\<`T`\>(`capacity`): [`CircleQueue`](CircleQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircleQueue`](CircleQueue.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:42](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L42)

• **new CircleQueue**\<`T`\>(`items`): [`CircleQueue`](CircleQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircleQueue`](CircleQueue.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:46](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L46)

• **new CircleQueue**\<`T`\>(`...items`): [`CircleQueue`](CircleQueue.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircleQueue`](CircleQueue.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:50](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L50)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Queue](../interfaces/Queue.md).[capacity](../interfaces/Queue.md#capacity)

#### Inherited from

CircleView.capacity

#### Defined in

[circle/circleView.ts:109](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L109)

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

CircleView.capacity

#### Defined in

[circle/circleView.ts:116](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Queue](../interfaces/Queue.md).[size](../interfaces/Queue.md#size)

#### Inherited from

CircleView.size

#### Defined in

[circle/circleView.ts:141](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L141)

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

[CircleView](CircleView.md).[[iterator]](CircleView.md#[iterator])

#### Defined in

[circle/circleView.ts:226](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L226)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Queue](../interfaces/Queue.md).[clear](../interfaces/Queue.md#clear)

#### Inherited from

[CircleView](CircleView.md).[clear](CircleView.md#clear)

#### Defined in

[circle/circleView.ts:148](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L148)

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

[CircleView](CircleView.md).[entries](CircleView.md#entries)

#### Defined in

[circle/circleView.ts:162](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L162)

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

[CircleView](CircleView.md).[forEach](CircleView.md#foreach)

#### Defined in

[circle/circleView.ts:176](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L176)

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

[circle/circleQueue.ts:20](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleQueue.ts#L20)

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

[CircleView](CircleView.md).[has](CircleView.md#has)

#### Defined in

[circle/circleView.ts:196](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L196)

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

[CircleView](CircleView.md).[keys](CircleView.md#keys)

#### Defined in

[circle/circleView.ts:213](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L213)

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

[circle/circleQueue.ts:31](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleQueue.ts#L31)

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

[circle/circleQueue.ts:60](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleQueue.ts#L60)

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

[CircleView](CircleView.md).[values](CircleView.md#values)

#### Defined in

[circle/circleView.ts:237](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L237)

---

### from

▸ **from**\<`T`, `I`\>(`this`, `iterable`): `InstanceType`\<`I`\>

Creates a collection from an iterable object.

#### Type parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `T`  | `T`                                          |
| `I`  | extends typeof [`CircleView`](CircleView.md) |

#### Parameters

| Name       | Type                                    | Description                                    |
| :--------- | :-------------------------------------- | :--------------------------------------------- |
| `this`     | `I`                                     | -                                              |
| `iterable` | `Iterable`\<`T`\> \| `ArrayLike`\<`T`\> | an iterable object to convert to a collection. |

#### Returns

`InstanceType`\<`I`\>

#### Inherited from

[CircleView](CircleView.md).[from](CircleView.md#from)

#### Defined in

[circle/circleView.ts:81](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L81)

---

### of

▸ **of**\<`T`, `I`\>(`this`, `...elements`): `InstanceType`\<`I`\>

Creates a collection from a variable number of arguments.

#### Type parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `T`  | `T`                                          |
| `I`  | extends typeof [`CircleView`](CircleView.md) |

#### Parameters

| Name          | Type  | Description                                      |
| :------------ | :---- | :----------------------------------------------- |
| `this`        | `I`   | -                                                |
| `...elements` | `T`[] | the elements to be inserted into the collection. |

#### Returns

`InstanceType`\<`I`\>

#### Inherited from

[CircleView](CircleView.md).[of](CircleView.md#of)

#### Defined in

[circle/circleView.ts:96](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L96)
