[circle-ds](../README.md) / [Exports](../modules.md) / CircularMap

# Class: CircularMap\<K, V\>

**`See`**

[Wikipedia](https://en.wikipedia.org/wiki/Circular_buffer)

## Type parameters

| Name |
| :------ |
| `K` |
| `V` |

## Hierarchy

- `CircularBase`\<[`K`, `V`]\>

  ↳ **`CircularMap`**

## Implements

- [`Bounded`](../interfaces/Bounded.md)\<[`K`, `V`]\>
- `Map`\<`K`, `V`\>
- [`Collection`](../interfaces/Collection.md)\<`K`, `V`\>

## Table of contents

### Constructors

- [constructor](CircularMap.md#constructor)

### Properties

- [\_capacity](CircularMap.md#_capacity)

### Accessors

- [[toStringTag]](CircularMap.md#[tostringtag])
- [capacity](CircularMap.md#capacity)
- [size](CircularMap.md#size)

### Methods

- [[iterator]](CircularMap.md#[iterator])
- [addListener](CircularMap.md#addlistener)
- [clear](CircularMap.md#clear)
- [delete](CircularMap.md#delete)
- [entries](CircularMap.md#entries)
- [forEach](CircularMap.md#foreach)
- [get](CircularMap.md#get)
- [has](CircularMap.md#has)
- [keys](CircularMap.md#keys)
- [on](CircularMap.md#on)
- [prependListener](CircularMap.md#prependlistener)
- [removeListener](CircularMap.md#removelistener)
- [set](CircularMap.md#set)
- [values](CircularMap.md#values)

## Constructors

### constructor

• **new CircularMap**\<`K`, `V`\>(): [`CircularMap`](CircularMap.md)\<`K`, `V`\>

Creates a new map with `capacity` defaulted to `Infinity`.

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Returns

[`CircularMap`](CircularMap.md)\<`K`, `V`\>

#### Overrides

CircularBase\&lt;[K, V]\&gt;.constructor

#### Defined in

[circle/circularMap.ts:35](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L35)

• **new CircularMap**\<`K`, `V`\>(`capacity?`): [`CircularMap`](CircularMap.md)\<`K`, `V`\>

Creates a new map with the given capacity.

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `capacity?` | ``null`` \| `number` | the map's capacity. |

#### Returns

[`CircularMap`](CircularMap.md)\<`K`, `V`\>

#### Overrides

CircularBase\&lt;[K, V]\&gt;.constructor

#### Defined in

[circle/circularMap.ts:41](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L41)

• **new CircularMap**\<`K`, `V`\>(`items`): [`CircularMap`](CircularMap.md)\<`K`, `V`\>

Creates a new map. Initial capacity is the number of unique items given.

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterable`\<[`K`, `V`]\> | the values to store in the map. |

#### Returns

[`CircularMap`](CircularMap.md)\<`K`, `V`\>

#### Overrides

CircularBase\&lt;[K, V]\&gt;.constructor

#### Defined in

[circle/circularMap.ts:47](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L47)

## Properties

### \_capacity

• `Protected` **\_capacity**: `number`

The maximum number of elements that can be stored in the collection.

#### Defined in

[circle/circularMap.ts:24](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L24)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

Return the type of the object.

#### Returns

`string`

#### Implementation of

Map.[toStringTag]

#### Defined in

[circle/circularMap.ts:93](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L93)

___

### capacity

• `get` **capacity**(): `number`

#### Returns

`number`

the maximum number of elements that can be stored.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularMap.ts:79](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L79)

• `set` **capacity**(`capacity`): `void`

The maximum number of elements that can be stored in the map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`void`

#### Implementation of

[Bounded](../interfaces/Bounded.md).[capacity](../interfaces/Bounded.md#capacity)

#### Defined in

[circle/circularMap.ts:100](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L100)

___

### size

• `get` **size**(): `number`

#### Returns

`number`

the number of values in the map.

#### Implementation of

[Collection](../interfaces/Collection.md).[size](../interfaces/Collection.md#size)

#### Defined in

[circle/circularMap.ts:86](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L86)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<[`K`, `V`]\>

Iterate through the map's values.

**Note:** Modifying the map during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<[`K`, `V`]\>

an iterable of values.

#### Implementation of

Map.[iterator]

#### Defined in

[circle/circularMap.ts:257](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L257)

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
| `listener` | (`elems`: [`K`, `V`][]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[addListener](../interfaces/Bounded.md#addlistener)

#### Inherited from

CircularBase.addListener

#### Defined in

[circle/circularBase.ts:40](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L40)

___

### clear

▸ **clear**(): `void`

Removes all elements from the map.

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[clear](../interfaces/Collection.md#clear)

#### Defined in

[circle/circularMap.ts:144](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L144)

___

### delete

▸ **delete**(`key`): `boolean`

Deletes a specified value from the map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`boolean`

`true` if the value existed in the map and has been removed, or `false` otherwise.

#### Implementation of

Map.delete

#### Defined in

[circle/circularMap.ts:153](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L153)

___

### entries

▸ **entries**(): `IterableIterator`\<[`K`, `V`]\>

Iterate through the map's entries.

**Note:** Modifying the map during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<[`K`, `V`]\>

an iterable of [key, value] pairs for every entry.

#### Implementation of

[Collection](../interfaces/Collection.md).[entries](../interfaces/Collection.md#entries)

#### Defined in

[circle/circularMap.ts:164](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L164)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each value in the map.

**Note:** Modifying the map during iteration may cause unexpected behavior.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `K`, `map`: `this`) => `void` | A function that accepts up to three arguments. It is called once per value. |
| `thisArg?` | `unknown` | An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`. |

#### Returns

`void`

#### Implementation of

[Collection](../interfaces/Collection.md).[forEach](../interfaces/Collection.md#foreach)

#### Defined in

[circle/circularMap.ts:176](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L176)

___

### get

▸ **get**(`key`): `undefined` \| `V`

Returns the associated value of the given key from the map.

If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`undefined` \| `V`

the value associated with the specified key, or `undefined` if no value is associated.

#### Implementation of

Map.get

#### Defined in

[circle/circularMap.ts:192](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L192)

___

### has

▸ **has**(`key`): `boolean`

Determines whether a given value is in the map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | The key to search for. |

#### Returns

`boolean`

`true` if the value was found, `false` otherwise.

#### Implementation of

Map.has

#### Defined in

[circle/circularMap.ts:203](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L203)

___

### keys

▸ **keys**(): `IterableIterator`\<`K`\>

Iterate through the map's keys.

**Note:** Modifying the map during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<`K`\>

an iterable of the map's keys.

#### Implementation of

[Collection](../interfaces/Collection.md).[keys](../interfaces/Collection.md#keys)

#### Defined in

[circle/circularMap.ts:214](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L214)

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
| `listener` | (`elems`: [`K`, `V`][]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[on](../interfaces/Bounded.md#on)

#### Inherited from

CircularBase.on

#### Defined in

[circle/circularBase.ts:73](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L73)

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
| `listener` | (`elems`: [`K`, `V`][]) => `void` | The callback function. It will receive an array of elements that have been removed due to overflow. This can happen when elements are added while the collection is at capacity, or when capacity is reduced below the current size. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[prependListener](../interfaces/Bounded.md#prependlistener)

#### Inherited from

CircularBase.prependListener

#### Defined in

[circle/circularBase.ts:102](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L102)

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
| `listener` | (`elems`: [`K`, `V`][]) => `void` | The callback function. |

#### Returns

`this`

the collection.

#### Implementation of

[Bounded](../interfaces/Bounded.md).[removeListener](../interfaces/Bounded.md#removelistener)

#### Inherited from

CircularBase.removeListener

#### Defined in

[circle/circularBase.ts:127](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularBase.ts#L127)

___

### set

▸ **set**(`key`, `value`): `this`

Sets the specified key-value pair in the map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `K` | the key to add |
| `value` | `V` | the key's value. |

#### Returns

`this`

#### Implementation of

Map.set

#### Defined in

[circle/circularMap.ts:224](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L224)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Iterate through the map's values.

**Note:** Modifying the map during iteration may cause unexpected behavior.

#### Returns

`IterableIterator`\<`V`\>

an iterable of the map's values.

#### Implementation of

[Collection](../interfaces/Collection.md).[values](../interfaces/Collection.md#values)

#### Defined in

[circle/circularMap.ts:268](https://github.com/havelessbemore/circle-ds/blob/5547555/src/circle/circularMap.ts#L268)
