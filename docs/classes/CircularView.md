[circle-ds](../README.md) / [Exports](../modules.md) / CircularView

# Class: CircularView\<T\>

A circular view is a fixed-size, read-only, circular array used to
store elements.

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :--- |
| `T`  |

## Hierarchy

- **`CircularView`**

  ↳ [`CircularDeque`](CircularDeque.md)

  ↳ [`CircularQueue`](CircularQueue.md)

  ↳ [`CircularStack`](CircularStack.md)

## Implements

- [`Collection`](../interfaces/Collection.md)\<`T`, `number`\>

## Table of contents

### Constructors

- [constructor](CircularView.md#constructor)

### Properties

- [\_size](CircularView.md#_size)
- [head](CircularView.md#head)
- [tail](CircularView.md#tail)
- [vals](CircularView.md#vals)

### Accessors

- [capacity](CircularView.md#capacity)
- [size](CircularView.md#size)

### Methods

- [[iterator]](CircularView.md#[iterator])
- [clear](CircularView.md#clear)
- [entries](CircularView.md#entries)
- [forEach](CircularView.md#foreach)
- [grow](CircularView.md#grow)
- [has](CircularView.md#has)
- [keys](CircularView.md#keys)
- [shrink](CircularView.md#shrink)
- [toInt](CircularView.md#toint)
- [values](CircularView.md#values)
- [from](CircularView.md#from)
- [of](CircularView.md#of)

## Constructors

### constructor

• **new CircularView**\<`T`\>(): [`CircularView`](CircularView.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircularView.capacity](CircularView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircularView`](CircularView.md)\<`T`\>

#### Defined in

[circular/circularView.ts:38](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L38)

• **new CircularView**\<`T`\>(`capacity`): [`CircularView`](CircularView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircularView`](CircularView.md)\<`T`\>

#### Defined in

[circular/circularView.ts:42](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L42)

• **new CircularView**\<`T`\>(`items`): [`CircularView`](CircularView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircularView`](CircularView.md)\<`T`\>

#### Defined in

[circular/circularView.ts:46](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L46)

• **new CircularView**\<`T`\>(`...items`): [`CircularView`](CircularView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircularView`](CircularView.md)\<`T`\>

#### Defined in

[circular/circularView.ts:50](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L50)

## Properties

### \_size

• `Protected` **\_size**: `number`

The number of elements in the collection.

#### Defined in

[circular/circularView.ts:21](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L21)

---

### head

• `Protected` **head**: `number`

The index representing the first element in the collection.

#### Defined in

[circular/circularView.ts:15](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L15)

---

### tail

• `Protected` **tail**: `number`

The index one more than the last element in the collection.

#### Defined in

[circular/circularView.ts:27](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L27)

---

### vals

• `Protected` **vals**: (`undefined` \| `T`)[]

The values in the collection.

#### Defined in

[circular/circularView.ts:33](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L33)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Collection](../interfaces/Collection.md).[capacity](../interfaces/Collection.md#capacity)

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

[Collection](../interfaces/Collection.md).[capacity](../interfaces/Collection.md#capacity)

#### Defined in

[circular/circularView.ts:116](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Collection](../interfaces/Collection.md).[size](../interfaces/Collection.md#size)

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

[Collection](../interfaces/Collection.md).[[iterator]](../interfaces/Collection.md#[iterator])

#### Defined in

[circular/circularView.ts:226](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L226)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[clear](../interfaces/Collection.md#clear)

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

[Collection](../interfaces/Collection.md).[entries](../interfaces/Collection.md#entries)

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

[Collection](../interfaces/Collection.md).[forEach](../interfaces/Collection.md#foreach)

#### Defined in

[circular/circularView.ts:176](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L176)

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

[Collection](../interfaces/Collection.md).[has](../interfaces/Collection.md#has)

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

[Collection](../interfaces/Collection.md).[keys](../interfaces/Collection.md#keys)

#### Defined in

[circular/circularView.ts:213](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L213)

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

[Collection](../interfaces/Collection.md).[values](../interfaces/Collection.md#values)

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

#### Defined in

[circular/circularView.ts:96](https://github.com/havelessbemore/circle-ds/blob/5237265/src/circular/circularView.ts#L96)
