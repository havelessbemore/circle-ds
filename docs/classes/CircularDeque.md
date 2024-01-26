[circle-ds](../README.md) / [Exports](../modules.md) / CircularDeque

# Class: CircularDeque\<T\>

A circular deque is similar to a traditional deque, but uses a fixed-size,
circular buffer. When the deque reaches its maximum capacity and a new
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

- [`CircularQueue`](CircularQueue.md)\<`T`\>

- [`CircularStack`](CircularStack.md)\<`T`\>

  ↳ **`CircularDeque`**

## Implements

- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularDeque.md#constructor)

### Properties

- [\_size](CircularDeque.md#_size)
- [head](CircularDeque.md#head)
- [tail](CircularDeque.md#tail)
- [vals](CircularDeque.md#vals)

### Accessors

- [capacity](CircularDeque.md#capacity)
- [size](CircularDeque.md#size)

### Methods

- [[iterator]](CircularDeque.md#[iterator])
- [back](CircularDeque.md#back)
- [bottom](CircularDeque.md#bottom)
- [clear](CircularDeque.md#clear)
- [entries](CircularDeque.md#entries)
- [forEach](CircularDeque.md#foreach)
- [front](CircularDeque.md#front)
- [grow](CircularDeque.md#grow)
- [has](CircularDeque.md#has)
- [keys](CircularDeque.md#keys)
- [pop](CircularDeque.md#pop)
- [push](CircularDeque.md#push)
- [shift](CircularDeque.md#shift)
- [shrink](CircularDeque.md#shrink)
- [toInt](CircularDeque.md#toint)
- [top](CircularDeque.md#top)
- [unshift](CircularDeque.md#unshift)
- [values](CircularDeque.md#values)
- [from](CircularDeque.md#from)
- [of](CircularDeque.md#of)

## Constructors

### constructor

• **new CircularDeque**\<`T`\>(): [`CircularDeque`](CircularDeque.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircularView.capacity](CircularView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Inherited from

[CircularStack](CircularStack.md).[constructor](CircularStack.md#constructor)

#### Defined in

[circular/circularView.ts:38](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L38)

• **new CircularDeque**\<`T`\>(`capacity`): [`CircularDeque`](CircularDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Inherited from

[CircularStack](CircularStack.md).[constructor](CircularStack.md#constructor)

#### Defined in

[circular/circularView.ts:42](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L42)

• **new CircularDeque**\<`T`\>(`items`): [`CircularDeque`](CircularDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Inherited from

[CircularStack](CircularStack.md).[constructor](CircularStack.md#constructor)

#### Defined in

[circular/circularView.ts:46](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L46)

• **new CircularDeque**\<`T`\>(`...items`): [`CircularDeque`](CircularDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircularDeque`](CircularDeque.md)\<`T`\>

#### Inherited from

[CircularStack](CircularStack.md).[constructor](CircularStack.md#constructor)

#### Defined in

[circular/circularView.ts:50](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L50)

## Properties

### \_size

• `Protected` **\_size**: `number`

The number of elements in the collection.

#### Inherited from

[CircularStack](CircularStack.md).[\_size](CircularStack.md#_size)

#### Defined in

[circular/circularView.ts:21](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L21)

---

### head

• `Protected` **head**: `number`

The index representing the first element in the collection.

#### Inherited from

[CircularStack](CircularStack.md).[head](CircularStack.md#head)

#### Defined in

[circular/circularView.ts:15](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L15)

---

### tail

• `Protected` **tail**: `number`

The index one more than the last element in the collection.

#### Inherited from

[CircularStack](CircularStack.md).[tail](CircularStack.md#tail)

#### Defined in

[circular/circularView.ts:27](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L27)

---

### vals

• `Protected` **vals**: (`undefined` \| `T`)[]

The values in the collection.

#### Inherited from

[CircularStack](CircularStack.md).[vals](CircularStack.md#vals)

#### Defined in

[circular/circularView.ts:33](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L33)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Deque](../interfaces/Deque.md).[capacity](../interfaces/Deque.md#capacity)

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

[Deque](../interfaces/Deque.md).[capacity](../interfaces/Deque.md#capacity)

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

[Deque](../interfaces/Deque.md).[size](../interfaces/Deque.md#size)

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

[Deque](../interfaces/Deque.md).[[iterator]](../interfaces/Deque.md#[iterator])

#### Inherited from

[CircularStack](CircularStack.md).[[iterator]](CircularStack.md#[iterator])

#### Defined in

[circular/circularView.ts:226](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L226)

---

### back

▸ **back**(): `undefined` \| `T`

Get the element at the back of the queue.

#### Returns

`undefined` \| `T`

the last inserted element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[back](../interfaces/Deque.md#back)

#### Defined in

[circular/circularDeque.ts:25](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularDeque.ts#L25)

---

### bottom

▸ **bottom**(): `undefined` \| `T`

Get the element at the bottom of the stack.

#### Returns

`undefined` \| `T`

the earliest inserted element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[bottom](../interfaces/Deque.md#bottom)

#### Defined in

[circular/circularDeque.ts:33](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularDeque.ts#L33)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Inherited from

[CircularStack](CircularStack.md).[clear](CircularStack.md#clear)

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

[Deque](../interfaces/Deque.md).[entries](../interfaces/Deque.md#entries)

#### Inherited from

[CircularStack](CircularStack.md).[entries](CircularStack.md#entries)

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

[Deque](../interfaces/Deque.md).[forEach](../interfaces/Deque.md#foreach)

#### Inherited from

[CircularStack](CircularStack.md).[forEach](CircularStack.md#foreach)

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

[Deque](../interfaces/Deque.md).[front](../interfaces/Deque.md#front)

#### Inherited from

[CircularQueue](CircularQueue.md).[front](CircularQueue.md#front)

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

[CircularStack](CircularStack.md).[grow](CircularStack.md#grow)

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

[Deque](../interfaces/Deque.md).[has](../interfaces/Deque.md#has)

#### Inherited from

[CircularStack](CircularStack.md).[has](CircularStack.md#has)

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

[Deque](../interfaces/Deque.md).[keys](../interfaces/Deque.md#keys)

#### Inherited from

[CircularStack](CircularStack.md).[keys](CircularStack.md#keys)

#### Defined in

[circular/circularView.ts:213](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L213)

---

### pop

▸ **pop**(): `undefined` \| `T`

Removes the last element from the stack and returns it.

#### Returns

`undefined` \| `T`

the last element in the stack, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[pop](../interfaces/Deque.md#pop)

#### Inherited from

[CircularStack](CircularStack.md).[pop](CircularStack.md#pop)

#### Defined in

[circular/circularStack.ts:20](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularStack.ts#L20)

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

[Deque](../interfaces/Deque.md).[push](../interfaces/Deque.md#push)

#### Inherited from

[CircularStack](CircularStack.md).[push](CircularStack.md#push)

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

[Deque](../interfaces/Deque.md).[shift](../interfaces/Deque.md#shift)

#### Inherited from

[CircularQueue](CircularQueue.md).[shift](CircularQueue.md#shift)

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

[CircularStack](CircularStack.md).[shrink](CircularStack.md#shrink)

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

[CircularStack](CircularStack.md).[toInt](CircularStack.md#toint)

#### Defined in

[circular/circularView.ts:251](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L251)

---

### top

▸ **top**(): `undefined` \| `T`

Get the element at the top of the stack.

#### Returns

`undefined` \| `T`

the last inserted element, or `undefined` if empty.

#### Implementation of

[Deque](../interfaces/Deque.md).[top](../interfaces/Deque.md#top)

#### Inherited from

[CircularStack](CircularStack.md).[top](CircularStack.md#top)

#### Defined in

[circular/circularStack.ts:67](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularStack.ts#L67)

---

### unshift

▸ **unshift**(`...elems`): `T`[]

Inserts new elements at the start of the collection.

#### Parameters

| Name       | Type  | Description        |
| :--------- | :---- | :----------------- |
| `...elems` | `T`[] | Elements to insert |

#### Returns

`T`[]

The overwritten elements

#### Implementation of

[Deque](../interfaces/Deque.md).[unshift](../interfaces/Deque.md#unshift)

#### Defined in

[circular/circularDeque.ts:43](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularDeque.ts#L43)

---

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Deque](../interfaces/Deque.md).[values](../interfaces/Deque.md#values)

#### Inherited from

[CircularStack](CircularStack.md).[values](CircularStack.md#values)

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

[CircularStack](CircularStack.md).[from](CircularStack.md#from)

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

[CircularStack](CircularStack.md).[of](CircularStack.md#of)

#### Defined in

[circular/circularView.ts:96](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L96)
