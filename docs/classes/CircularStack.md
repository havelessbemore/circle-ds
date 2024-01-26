[circle-ds](../README.md) / CircularStack

# Class: CircularStack\<T\>

A circular stack is similar to a traditional stack, but uses a fixed-size,
circular buffer. When the stack reaches its maximum capacity and a new
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

  ↳ **`CircularStack`**

  ↳↳ [`CircularDeque`](CircularDeque.md)

## Implements

- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircularStack.md#constructor)

### Properties

- [\_size](CircularStack.md#_size)
- [head](CircularStack.md#head)
- [tail](CircularStack.md#tail)
- [vals](CircularStack.md#vals)

### Accessors

- [capacity](CircularStack.md#capacity)
- [size](CircularStack.md#size)

### Methods

- [[iterator]](CircularStack.md#[iterator])
- [clear](CircularStack.md#clear)
- [entries](CircularStack.md#entries)
- [forEach](CircularStack.md#foreach)
- [grow](CircularStack.md#grow)
- [has](CircularStack.md#has)
- [keys](CircularStack.md#keys)
- [pop](CircularStack.md#pop)
- [push](CircularStack.md#push)
- [shrink](CircularStack.md#shrink)
- [toInt](CircularStack.md#toint)
- [top](CircularStack.md#top)
- [values](CircularStack.md#values)
- [from](CircularStack.md#from)
- [of](CircularStack.md#of)

## Constructors

### constructor

• **new CircularStack**\<`T`\>(): [`CircularStack`](CircularStack.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircularView.capacity](CircularView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:39](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L39)

• **new CircularStack**\<`T`\>(`capacity`): [`CircularStack`](CircularStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:43](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L43)

• **new CircularStack**\<`T`\>(`items`): [`CircularStack`](CircularStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:47](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L47)

• **new CircularStack**\<`T`\>(`...items`): [`CircularStack`](CircularStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircularStack`](CircularStack.md)\<`T`\>

#### Inherited from

[CircularView](CircularView.md).[constructor](CircularView.md#constructor)

#### Defined in

[circular/circularView.ts:51](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L51)

## Properties

### \_size

• `Protected` **\_size**: `number`

The number of elements in the collection.

#### Inherited from

[CircularView](CircularView.md).[\_size](CircularView.md#_size)

#### Defined in

[circular/circularView.ts:21](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L21)

---

### head

• `Protected` **head**: `number`

The index representing the first element in the collection.

#### Inherited from

[CircularView](CircularView.md).[head](CircularView.md#head)

#### Defined in

[circular/circularView.ts:15](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L15)

---

### tail

• `Protected` **tail**: `number`

The index one more than the last element in the collection.

#### Inherited from

[CircularView](CircularView.md).[tail](CircularView.md#tail)

#### Defined in

[circular/circularView.ts:27](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L27)

---

### vals

• `Protected` **vals**: (`undefined` \| `T`)[]

The values in the collection.

#### Inherited from

[CircularView](CircularView.md).[vals](CircularView.md#vals)

#### Defined in

[circular/circularView.ts:34](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L34)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Stack](../interfaces/Stack.md).[capacity](../interfaces/Stack.md#capacity)

#### Inherited from

CircularView.capacity

#### Defined in

[circular/circularView.ts:110](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L110)

• `set` **capacity**(`newCapacity`): `void`

Sets the maximum number of elements that can be stored.

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `newCapacity` | `number` |

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[capacity](../interfaces/Stack.md#capacity)

#### Inherited from

CircularView.capacity

#### Defined in

[circular/circularView.ts:117](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L117)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[size](../interfaces/Stack.md#size)

#### Inherited from

CircularView.size

#### Defined in

[circular/circularView.ts:142](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L142)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Stack](../interfaces/Stack.md).[[iterator]](../interfaces/Stack.md#[iterator])

#### Inherited from

[CircularView](CircularView.md).[[iterator]](CircularView.md#[iterator])

#### Defined in

[circular/circularView.ts:227](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L227)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Inherited from

[CircularView](CircularView.md).[clear](CircularView.md#clear)

#### Defined in

[circular/circularView.ts:149](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L149)

---

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `T`]\>

Iterate through the collection's entries.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<[`number`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Stack](../interfaces/Stack.md).[entries](../interfaces/Stack.md#entries)

#### Inherited from

[CircularView](CircularView.md).[entries](CircularView.md#entries)

#### Defined in

[circular/circularView.ts:163](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L163)

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

[Stack](../interfaces/Stack.md).[forEach](../interfaces/Stack.md#foreach)

#### Inherited from

[CircularView](CircularView.md).[forEach](CircularView.md#foreach)

#### Defined in

[circular/circularView.ts:177](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L177)

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

[circular/circularView.ts:262](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L262)

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

[Stack](../interfaces/Stack.md).[has](../interfaces/Stack.md#has)

#### Inherited from

[CircularView](CircularView.md).[has](CircularView.md#has)

#### Defined in

[circular/circularView.ts:197](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L197)

---

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Iterate through the collection's keys.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`number`\>

an iterable of keys.

#### Implementation of

[Stack](../interfaces/Stack.md).[keys](../interfaces/Stack.md#keys)

#### Inherited from

[CircularView](CircularView.md).[keys](CircularView.md#keys)

#### Defined in

[circular/circularView.ts:214](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L214)

---

### pop

▸ **pop**(): `undefined` \| `T`

Removes the last element from the stack and returns it.

#### Returns

`undefined` \| `T`

the last element in the stack, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[pop](../interfaces/Stack.md#pop)

#### Defined in

[circular/circularStack.ts:20](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularStack.ts#L20)

---

### push

▸ **push**(`...elems`): `T`[]

Inserts new elements at the end of the stack.

#### Parameters

| Name       | Type  | Description         |
| :--------- | :---- | :------------------ |
| `...elems` | `T`[] | Elements to insert. |

#### Returns

`T`[]

The overwritten elements, if any.

#### Implementation of

[Stack](../interfaces/Stack.md).[push](../interfaces/Stack.md#push)

#### Defined in

[circular/circularStack.ts:38](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularStack.ts#L38)

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

[circular/circularView.ts:286](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L286)

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

[circular/circularView.ts:252](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L252)

---

### top

▸ **top**(): `undefined` \| `T`

Get the element at the top of the stack.

#### Returns

`undefined` \| `T`

the last inserted element, or `undefined` if empty.

#### Implementation of

[Stack](../interfaces/Stack.md).[top](../interfaces/Stack.md#top)

#### Defined in

[circular/circularStack.ts:67](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularStack.ts#L67)

---

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the collection's values.

**NOTE:** Unknown behavior may occur if the collection is modified during use.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

[Stack](../interfaces/Stack.md).[values](../interfaces/Stack.md#values)

#### Inherited from

[CircularView](CircularView.md).[values](CircularView.md#values)

#### Defined in

[circular/circularView.ts:238](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L238)

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

[circular/circularView.ts:82](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L82)

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

[circular/circularView.ts:97](https://github.com/havelessbemore/circle-ds/blob/b227384/src/circular/circularView.ts#L97)
