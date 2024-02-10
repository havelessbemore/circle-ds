[circle-ds](../README.md) / [Exports](../modules.md) / Bounded

# Interface: Bounded\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`CircularLinkedDeque`](../classes/CircularLinkedDeque.md)
- [`CircularLinkedQueue`](../classes/CircularLinkedQueue.md)
- [`CircularLinkedStack`](../classes/CircularLinkedStack.md)
- [`CircularMap`](../classes/CircularMap.md)
- [`CircularQueue`](../classes/CircularQueue.md)
- [`CircularSet`](../classes/CircularSet.md)
- [`CircularStack`](../classes/CircularStack.md)

## Table of contents

### Properties

- [capacity](Bounded.md#capacity)

### Methods

- [addListener](Bounded.md#addlistener)
- [on](Bounded.md#on)
- [prependListener](Bounded.md#prependlistener)
- [removeListener](Bounded.md#removelistener)

## Properties

### capacity

• **capacity**: `number`

#### Defined in

[types/bounded.ts:5](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L5)

## Methods

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

#### Defined in

[types/bounded.ts:27](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L27)

▸ **addListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.ts:31](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L31)

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

#### Defined in

[types/bounded.ts:57](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L57)

▸ **on**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.ts:58](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L58)

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

#### Defined in

[types/bounded.ts:83](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L83)

▸ **prependListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.ts:87](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L87)

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

#### Defined in

[types/bounded.ts:105](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L105)

▸ **removeListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.ts:109](https://github.com/havelessbemore/circle-ds/blob/e0d2f00/src/types/bounded.ts#L109)
