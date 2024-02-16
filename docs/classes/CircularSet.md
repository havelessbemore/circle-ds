[circle-ds](../README.md) / [Exports](../modules.md) / CircularSet

# Class: CircularSet\<T\>

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `CircularBase`\<`T`\>

  ↳ **`CircularSet`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<`T`\>
- `Set`\<`T`\>
- [`Collection`](../interfaces/Collection.md)\<`T`, `T`\>

## Table of contents

### Constructors

- [constructor](CircularSet.md#constructor)

### Properties

- [\_capacity](CircularSet.md#_capacity)

### Accessors

- [[toStringTag]](CircularSet.md#[tostringtag])
- [capacity](CircularSet.md#capacity)
- [size](CircularSet.md#size)

### Methods

- [[iterator]](CircularSet.md#[iterator])
- [add](CircularSet.md#add)
- [addListener](CircularSet.md#addlistener)
- [clear](CircularSet.md#clear)
- [delete](CircularSet.md#delete)
- [entries](CircularSet.md#entries)
- [forEach](CircularSet.md#foreach)
- [has](CircularSet.md#has)
- [keys](CircularSet.md#keys)
- [on](CircularSet.md#on)
- [prependListener](CircularSet.md#prependlistener)
- [removeListener](CircularSet.md#removelistener)
- [values](CircularSet.md#values)

## Constructors

### constructor

• **new CircularSet**\<`T`\>(): [`CircularSet`](CircularSet.md)\<`T`\>

Creates a new set with `capacity` defaulted to `Infinity`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`CircularSet`](CircularSet.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularSet.ts:29](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L29)

• **new CircularSet**\<`T`\>(`capacity?`): [`CircularSet`](CircularSet.md)\<`T`\>

Creates a new set with the given capacity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the set's capacity. |

#### Returns

[`CircularSet`](CircularSet.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularSet.ts:35](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L35)

• **new CircularSet**\<`T`\>(`items`): [`CircularSet`](CircularSet.md)\<`T`\>

Creates a new set. Initial capacity is the number of unique items given.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<`T`\> | the values to store in the set. |

#### Returns

[`CircularSet`](CircularSet.md)\<`T`\>

#### Overrides

CircularBase\&lt;T\&gt;.constructor

#### Defined in

[circle/circularSet.ts:41](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L41)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularSet.ts:18](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L18)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Implementation of

Set.[toStringTag]

#### Defined in

[circle/circularSet.ts:86](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L86)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularSet.ts:72](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L72)

• `set` **capacity**(`capacity`): `void`

The maximum number of elements that can be stored in the set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`void`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularSet.ts:93](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L93)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of values in the set.

#### Implementation of

Set.size

#### Defined in

[circle/circularSet.ts:79](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L79)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`T`\>

Iterate through the set's values.

**Note:** Modifying the set during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<`T`\>

an iterable of values.

#### Implementation of

Set.[iterator]

#### Defined in

[circle/circularSet.ts:249](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L249)

___

### add

▸ **add**(`value`): `this`

Adds the specified value to the set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the value to add. |

#### Returns

`this`

#### Implementation of

Set.add

#### Defined in

[circle/circularSet.ts:139](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L139)

___

### addListener

▸ **addListener**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* By default, event listeners are invoked in the order they are added.
The `prependListener()` method can be used as an alternative to add
the event listener to the beginning of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[addListener](../interfaces/Bounded.md#addlistener)

#### Inherited from

CircularBase.addListener

#### Defined in

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Removes all elements from the set.

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[clear](../interfaces/Collection.md#clear)

#### Defined in

[circle/circularSet.ts:168](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L168)

___

### delete

▸ **delete**(`value`): `boolean`

Deletes a specified value from the set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

`true` if the value existed in the set and has been removed, or `false` otherwise.

#### Implementation of

Set.delete

#### Defined in

[circle/circularSet.ts:177](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L177)

___

### entries

▸ **entries**(): `IterableIterator`\<[`T`, `T`]\>

Iterate through the set's entries.

**Note:** Modifying the set during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<[`T`, `T`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Collection](../interfaces/Collection.md).[entries](../interfaces/Collection.md#entries)

#### Defined in

[circle/circularSet.ts:188](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L188)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each value in the set.

**Note:** Modifying the set during iteration may cause unexpected behavior.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `T`, `key`: `T`, `set`: `this`) => `void` | A function that accepts up to three arguments. It is called once per value. |
| `thisArg?` | `unknown` | An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`. |

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[forEach](../interfaces/Collection.md#foreach)

#### Defined in

[circle/circularSet.ts:200](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L200)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a given value is in the set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value to search for. |

#### Returns

`boolean`

`true` if the value was found, `false` otherwise.

#### Implementation of

Set.has

#### Defined in

[circle/circularSet.ts:216](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L216)

___

### keys

▸ **keys**(): `IterableIterator`\<`T`\>

Iterate through the set's keys.

**Note:** Modifying the set during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<`T`\>

an iterable of the set's keys.

#### Implementation of

[Collection](../interfaces/Collection.md).[keys](../interfaces/Collection.md#keys)

#### Defined in

[circle/circularSet.ts:227](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L227)

___

### on

▸ **on**(`event`, `listener`): `this`

Appends the listener function to the listeners array for the
[BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* By default, event listeners are invoked in the order they are added.
The `prependListener()` method can be used as an alternative to add
the event listener to the beginning of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[on](../interfaces/Bounded.md#on)

#### Inherited from

CircularBase.on

#### Defined in

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L73)

___

### prependListener

▸ **prependListener**(`event`, `listener`): `this`

Adds the listener function to the beginning of the listeners array for
the [BoundedEvent.Overflow](../modules.md#overflow) event.

* No checks are made to see if the listener has already been added.
Multiple calls with the same of event + listener combination will
result in the listener being added and called multiple times.

* Alternatively, the `addListener()` method can be used to add
the event listener to the end of the listeners array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[prependListener](../interfaces/Bounded.md#prependlistener)

#### Inherited from

CircularBase.prependListener

#### Defined in

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L102)

___

### removeListener

▸ **removeListener**(`event`, `listener`): `this`

Removes the specified listener from the listener array for the event.

At most once instance of a listener will be removed. If a listener
has been added multiple times for the same event, this method should
be called once per instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The name of the event. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[removeListener](../interfaces/Bounded.md#removelistener)

#### Inherited from

CircularBase.removeListener

#### Defined in

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularBase.ts#L127)

___

### values

▸ **values**(): `IterableIterator`\<`T`\>

Iterate through the set's values.

**Note:** Modifying the set during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<`T`\>

an iterable of the set's values.

#### Implementation of

[Collection](../interfaces/Collection.md).[values](../interfaces/Collection.md#values)

#### Defined in

[circle/circularSet.ts:238](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/circle/circularSet.ts#L238)
