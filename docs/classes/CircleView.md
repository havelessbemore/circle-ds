[circle-ds](../README.md) / [Exports](../modules.md) / CircleView

# Class: CircleView\<T\>

A circular view is a fixed-size, read-only, circular array used to
store elements.

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :--- |
| `T`  |

## Hierarchy

- **`CircleView`**

  ↳ [`CircleDeque`](CircleDeque.md)

  ↳ [`CircleQueue`](CircleQueue.md)

  ↳ [`CircleStack`](CircleStack.md)

## Implements

- [`Collection`](../interfaces/Collection.md)\<`T`, `number`\>

## Table of contents

### Constructors

- [constructor](CircleView.md#constructor)

### Accessors

- [capacity](CircleView.md#capacity)
- [size](CircleView.md#size)

### Methods

- [[iterator]](CircleView.md#[iterator])
- [clear](CircleView.md#clear)
- [entries](CircleView.md#entries)
- [forEach](CircleView.md#foreach)
- [has](CircleView.md#has)
- [keys](CircleView.md#keys)
- [values](CircleView.md#values)
- [from](CircleView.md#from)
- [of](CircleView.md#of)

## Constructors

### constructor

• **new CircleView**\<`T`\>(): [`CircleView`](CircleView.md)\<`T`\>

Capacity defaults to zero and should be updated via [CircleView.capacity](CircleView.md#capacity).

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[`CircleView`](CircleView.md)\<`T`\>

#### Defined in

[circle/circleView.ts:38](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L38)

• **new CircleView**\<`T`\>(`capacity`): [`CircleView`](CircleView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     | Description           |
| :--------- | :------- | :-------------------- |
| `capacity` | `number` | the maximum capacity. |

#### Returns

[`CircleView`](CircleView.md)\<`T`\>

#### Defined in

[circle/circleView.ts:42](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L42)

• **new CircleView**\<`T`\>(`items`): [`CircleView`](CircleView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type              | Description                           |
| :------ | :---------------- | :------------------------------------ |
| `items` | `Iterable`\<`T`\> | the items to store in the collection. |

#### Returns

[`CircleView`](CircleView.md)\<`T`\>

#### Defined in

[circle/circleView.ts:46](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L46)

• **new CircleView**\<`T`\>(`...items`): [`CircleView`](CircleView.md)\<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| `...items` | `T`[] | the items to store in the collection. |

#### Returns

[`CircleView`](CircleView.md)\<`T`\>

#### Defined in

[circle/circleView.ts:50](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L50)

## Accessors

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Collection](../interfaces/Collection.md).[capacity](../interfaces/Collection.md#capacity)

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

[Collection](../interfaces/Collection.md).[capacity](../interfaces/Collection.md#capacity)

#### Defined in

[circle/circleView.ts:116](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L116)

---

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of elements in the collection.

#### Implementation of

[Collection](../interfaces/Collection.md).[size](../interfaces/Collection.md#size)

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

[Collection](../interfaces/Collection.md).[[iterator]](../interfaces/Collection.md#[iterator])

#### Defined in

[circle/circleView.ts:226](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L226)

---

### clear

▸ **clear**(): `void`

Remove all elements and resets the collection.

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[clear](../interfaces/Collection.md#clear)

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

[Collection](../interfaces/Collection.md).[entries](../interfaces/Collection.md#entries)

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

[Collection](../interfaces/Collection.md).[forEach](../interfaces/Collection.md#foreach)

#### Defined in

[circle/circleView.ts:176](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L176)

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

[Collection](../interfaces/Collection.md).[keys](../interfaces/Collection.md#keys)

#### Defined in

[circle/circleView.ts:213](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L213)

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

#### Defined in

[circle/circleView.ts:96](https://github.com/havelessbemore/circle-ds/blob/87dd4ee/src/circle/circleView.ts#L96)
