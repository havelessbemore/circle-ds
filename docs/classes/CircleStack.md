[circle-ds](../README.md) / [Exports](../modules.md) / CircleStack

# Class: CircleStack\<T\>

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

- [`CircleView`](CircleView.md)\<`T`\>

  ↳ **`CircleStack`**

  ↳↳ [`CircleDeque`](CircleDeque.md)

## Implements

- [`Stack`](../interfaces/Stack.md)\<`T`\>

## Table of contents

### Constructors

- [constructor](CircleStack.md#constructor)

### Accessors

- [capacity](CircleStack.md#capacity)
- [size](CircleStack.md#size)

### Methods

- [[iterator]](CircleStack.md#[iterator])
- [clear](CircleStack.md#clear)
- [entries](CircleStack.md#entries)
- [forEach](CircleStack.md#foreach)
- [has](CircleStack.md#has)
- [keys](CircleStack.md#keys)
- [pop](CircleStack.md#pop)
- [push](CircleStack.md#push)
- [top](CircleStack.md#top)
- [values](CircleStack.md#values)
- [from](CircleStack.md#from)
- [of](CircleStack.md#of)

## Constructors

### constructor

• **new CircleStack**\<`T`\>(): [`CircleStack`](CircleStack.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircleView.capacity](CircleView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircleStack`](CircleStack.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:38](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L38)

• **new CircleStack**\<`T`\>(`capacity`): [`CircleStack`](CircleStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircleStack`](CircleStack.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:42](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L42)

• **new CircleStack**\<`T`\>(`items`): [`CircleStack`](CircleStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircleStack`](CircleStack.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:46](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L46)

• **new CircleStack**\<`T`\>(`...items`): [`CircleStack`](CircleStack.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircleStack`](CircleStack.md)\<`T`\>

#### Inherited from

[CircleView](CircleView.md).[constructor](CircleView.md#constructor)

#### Defined in

[circle/circleView.ts:50](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L50)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Stack](../interfaces/Stack.md).[capacity](../interfaces/Stack.md#capacity)

#### Inherited from

CircleView.capacity

#### Defined in

[circle/circleView.ts:109](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L109)

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

CircleView.capacity

#### Defined in

[circle/circleView.ts:116](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Stack](../interfaces/Stack.md).[size](../interfaces/Stack.md#size)

#### Inherited from

CircleView.size

#### Defined in

[circle/circleView.ts:141](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L141)

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

[CircleView](CircleView.md).[[iterator]](CircleView.md#[iterator])

#### Defined in

[circle/circleView.ts:226](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L226)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Stack](../interfaces/Stack.md).[clear](../interfaces/Stack.md#clear)

#### Inherited from

[CircleView](CircleView.md).[clear](CircleView.md#clear)

#### Defined in

[circle/circleView.ts:148](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L148)

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

[CircleView](CircleView.md).[entries](CircleView.md#entries)

#### Defined in

[circle/circleView.ts:162](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L162)

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

[CircleView](CircleView.md).[forEach](CircleView.md#foreach)

#### Defined in

[circle/circleView.ts:176](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L176)

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

[CircleView](CircleView.md).[has](CircleView.md#has)

#### Defined in

[circle/circleView.ts:196](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L196)

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

[CircleView](CircleView.md).[keys](CircleView.md#keys)

#### Defined in

[circle/circleView.ts:213](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L213)

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

[circle/circleStack.ts:20](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleStack.ts#L20)

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

[circle/circleStack.ts:38](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleStack.ts#L38)

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

[circle/circleStack.ts:67](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleStack.ts#L67)

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

[CircleView](CircleView.md).[values](CircleView.md#values)

#### Defined in

[circle/circleView.ts:237](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L237)

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

[circle/circleView.ts:81](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L81)

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

[circle/circleView.ts:96](https://github.com/havelessbemore/circle-ds/blob/be03be2/src/circle/circleView.ts#L96)
