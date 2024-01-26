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

### Properties

- [\_size](CircleDeque.md#_size)
- [head](CircleDeque.md#head)
- [tail](CircleDeque.md#tail)
- [vals](CircleDeque.md#vals)

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
- [grow](CircleDeque.md#grow)
- [has](CircleDeque.md#has)
- [keys](CircleDeque.md#keys)
- [pop](CircleDeque.md#pop)
- [push](CircleDeque.md#push)
- [shift](CircleDeque.md#shift)
- [shrink](CircleDeque.md#shrink)
- [toInt](CircleDeque.md#toint)
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

circle/circleView.ts:38

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

circle/circleView.ts:42

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

circle/circleView.ts:46

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

circle/circleView.ts:50

## Properties

### \_size

• `Protected` **\_size**: `number`

The number of elements in the collection.

#### Inherited from

[CircleStack](CircleStack.md).[\_size](CircleStack.md#_size)

#### Defined in

circle/circleView.ts:21

---

### head

• `Protected` **head**: `number`

The index representing the first element in the collection.

#### Inherited from

[CircleStack](CircleStack.md).[head](CircleStack.md#head)

#### Defined in

circle/circleView.ts:15

---

### tail

• `Protected` **tail**: `number`

The index one more than the last element in the collection.

#### Inherited from

[CircleStack](CircleStack.md).[tail](CircleStack.md#tail)

#### Defined in

circle/circleView.ts:27

---

### vals

• `Protected` **vals**: (`undefined` \| `T`)[]

The values in the collection.

#### Inherited from

[CircleStack](CircleStack.md).[vals](CircleStack.md#vals)

#### Defined in

circle/circleView.ts:33

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

circle/circleView.ts:109

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

circle/circleView.ts:116

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

circle/circleView.ts:141

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

circle/circleView.ts:226

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

circle/circleDeque.ts:25

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

circle/circleDeque.ts:33

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

circle/circleView.ts:148

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

circle/circleView.ts:162

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

circle/circleView.ts:176

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

circle/circleQueue.ts:20

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

[CircleStack](CircleStack.md).[grow](CircleStack.md#grow)

#### Defined in

circle/circleView.ts:261

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

circle/circleView.ts:196

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

circle/circleView.ts:213

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

circle/circleStack.ts:20

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

circle/circleQueue.ts:31

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

circle/circleQueue.ts:60

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

[CircleStack](CircleStack.md).[shrink](CircleStack.md#shrink)

#### Defined in

circle/circleView.ts:285

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

[CircleStack](CircleStack.md).[toInt](CircleStack.md#toint)

#### Defined in

circle/circleView.ts:251

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

circle/circleStack.ts:67

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

circle/circleDeque.ts:43

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

circle/circleView.ts:237

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

circle/circleView.ts:81

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

circle/circleView.ts:96
