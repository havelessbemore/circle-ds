[circle-ds](../README.md) / [Exports](../modules.md) / CircleDeque

# Class: CircleDeque\<T\>

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

- [`CircleView`](CircleView.md)\<`T`\>

- [`CircleQueue`](CircleQueue.md)\<`T`\>

- [`CircleStack`](CircleStack.md)\<`T`\>

  ↳ **`CircleDeque`**

## Implements

- [`Deque`](../interfaces/Deque.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircleDeque.md#constructor)

### Accessors

- [capacity](CircleDeque.md#capacity)
- [size](CircleDeque.md#size)

### Methods

- [[iterator]](CircleDeque.md#[iterator])
- [back](CircleDeque.md#back)
- [bottom](CircleDeque.md#bottom)
- [clear](CircleDeque.md#clear)
- [entries](CircleDeque.md#entries)
- [forEach](CircleDeque.md#foreach)
- [front](CircleDeque.md#front)
- [has](CircleDeque.md#has)
- [keys](CircleDeque.md#keys)
- [pop](CircleDeque.md#pop)
- [push](CircleDeque.md#push)
- [shift](CircleDeque.md#shift)
- [top](CircleDeque.md#top)
- [unshift](CircleDeque.md#unshift)
- [values](CircleDeque.md#values)
- [from](CircleDeque.md#from)
- [of](CircleDeque.md#of)

## Constructors

### constructor

• **new CircleDeque**\<`T`\>(): [`CircleDeque`](CircleDeque.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircleView.capacity](CircleView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircleDeque`](CircleDeque.md)\<`T`\>

#### Inherited from

[CircleStack](CircleStack.md).[constructor](CircleStack.md#constructor)

#### Defined in

[circle/circleView.ts:38](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L38)

• **new CircleDeque**\<`T`\>(`capacity`): [`CircleDeque`](CircleDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircleDeque`](CircleDeque.md)\<`T`\>

#### Inherited from

[CircleStack](CircleStack.md).[constructor](CircleStack.md#constructor)

#### Defined in

[circle/circleView.ts:42](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L42)

• **new CircleDeque**\<`T`\>(`items`): [`CircleDeque`](CircleDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircleDeque`](CircleDeque.md)\<`T`\>

#### Inherited from

[CircleStack](CircleStack.md).[constructor](CircleStack.md#constructor)

#### Defined in

[circle/circleView.ts:46](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L46)

• **new CircleDeque**\<`T`\>(`...items`): [`CircleDeque`](CircleDeque.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircleDeque`](CircleDeque.md)\<`T`\>

#### Inherited from

[CircleStack](CircleStack.md).[constructor](CircleStack.md#constructor)

#### Defined in

[circle/circleView.ts:50](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L50)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Deque](../interfaces/Deque.md).[capacity](../interfaces/Deque.md#capacity)

#### Inherited from

CircleView.capacity

#### Defined in

[circle/circleView.ts:109](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L109)

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

CircleView.capacity

#### Defined in

[circle/circleView.ts:116](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Deque](../interfaces/Deque.md).[size](../interfaces/Deque.md#size)

#### Inherited from

CircleView.size

#### Defined in

[circle/circleView.ts:141](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L141)

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

[CircleStack](CircleStack.md).[[iterator]](CircleStack.md#[iterator])

#### Defined in

[circle/circleView.ts:226](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L226)

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

[circle/circleDeque.ts:25](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleDeque.ts#L25)

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

[circle/circleDeque.ts:33](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleDeque.ts#L33)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Deque](../interfaces/Deque.md).[clear](../interfaces/Deque.md#clear)

#### Inherited from

[CircleStack](CircleStack.md).[clear](CircleStack.md#clear)

#### Defined in

[circle/circleView.ts:148](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L148)

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

[CircleStack](CircleStack.md).[entries](CircleStack.md#entries)

#### Defined in

[circle/circleView.ts:162](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L162)

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

[CircleStack](CircleStack.md).[forEach](CircleStack.md#foreach)

#### Defined in

[circle/circleView.ts:176](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L176)

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

[CircleQueue](CircleQueue.md).[front](CircleQueue.md#front)

#### Defined in

[circle/circleQueue.ts:20](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleQueue.ts#L20)

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

[CircleStack](CircleStack.md).[has](CircleStack.md#has)

#### Defined in

[circle/circleView.ts:196](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L196)

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

[CircleStack](CircleStack.md).[keys](CircleStack.md#keys)

#### Defined in

[circle/circleView.ts:213](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L213)

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

[CircleStack](CircleStack.md).[pop](CircleStack.md#pop)

#### Defined in

[circle/circleStack.ts:20](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleStack.ts#L20)

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

[CircleStack](CircleStack.md).[push](CircleStack.md#push)

#### Defined in

[circle/circleQueue.ts:31](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleQueue.ts#L31)

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

[CircleQueue](CircleQueue.md).[shift](CircleQueue.md#shift)

#### Defined in

[circle/circleQueue.ts:60](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleQueue.ts#L60)

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

[CircleStack](CircleStack.md).[top](CircleStack.md#top)

#### Defined in

[circle/circleStack.ts:67](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleStack.ts#L67)

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

[circle/circleDeque.ts:43](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleDeque.ts#L43)

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

[CircleStack](CircleStack.md).[values](CircleStack.md#values)

#### Defined in

[circle/circleView.ts:237](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L237)

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

[CircleStack](CircleStack.md).[from](CircleStack.md#from)

#### Defined in

[circle/circleView.ts:81](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L81)

---

### of

▸ **of**\<`I`, `T`\>(`this`, `...elements`): `InstanceType`\<`I`\>

Creates a collection from a variable number of arguments.

#### Type parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `I`  | extends typeof [`CircleView`](CircleView.md) |
| `T`  | `unknown`                                    |

#### Parameters

| Name          | Type  | Description                                      |
| :------------ | :---- | :----------------------------------------------- |
| `this`        | `I`   | -                                                |
| `...elements` | `T`[] | the elements to be inserted into the collection. |

#### Returns

`InstanceType`\<`I`\>

#### Inherited from

[CircleStack](CircleStack.md).[of](CircleStack.md#of)

#### Defined in

[circle/circleView.ts:96](https://github.com/havelessbemore/circle-ds/blob/5b91af9/src/circle/circleView.ts#L96)
