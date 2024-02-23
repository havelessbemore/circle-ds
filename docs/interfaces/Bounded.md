[circle-ds](../README.md) / [Exports](../modules.md) / Bounded

# Interface: Bounded\<T\>

A bounded collection restricts the number of elements it can hold to a
specified capacity. When an attempt is made to add elements beyond this
capacity, the collection may either throw an error or remove existing elements
to make room for the new ones. If the latter, 'Overflow' events should be triggered.

The interface provides methods to manage event listeners for two types of events:
- `Overflow`: Emitted when elements are removed from the collection due to it
  exceeding its capacity. Listeners receive an array of the removed
  elements as an argument. Removed elements may be sent across 1 or more
  event instances.
- General events: Allows for listening to other events within the
  collection. The nature of these events is determined by the concrete
  implementation of the interface.

Methods include:
- `addListener` and `on`: Attach a listener to the end of the listeners array for a
  specified event. If a listener is added multiple times, it will be invoked multiple
  times per event.
- `prependListener`: Similar to `addListener`, but adds the listener to the beginning
  of the listeners array.
- `removeListener`: Removes a listener for a specified event. If the listener was added
  multiple times, each call removes one instance.

Implementers of this interface should ensure thread safety and consistency of the
collection's state, especially when dealing with asynchronous event listeners.

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`CircularArrayList`](../classes/CircularArrayList.md)
- [`CircularDeque`](../classes/CircularDeque.md)
- [`CircularDoublyLinkedList`](../classes/CircularDoublyLinkedList.md)
- [`CircularLinkedDeque`](../classes/CircularLinkedDeque.md)
- [`CircularLinkedList`](../classes/CircularLinkedList.md)
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

Represents the maximum number of elements that the collection can hold. Once
capacity is reached, no additional elements can be added without removing
existing elements first. This is integral to the behavior of bounded collections,
providing a way to manage size.

1. Capacity should be a non-negative integer.

1. Implementers may choose to support dynamic capacity updates.

1. Implementers may choose to accept positive infinity (`Number.POSITIVE_INFINITY`) as
a valid capacity. This would effectively remove the upper limit on the collection size,
allowing it to grow unbounded. That said, size may still be constrained by the
implementation. For example, a simple array-based collection would be
limited to an array's maximum length (2^32 - 1 in JavaScript).

#### Defined in

[types/bounded.d.ts:48](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L48)

## Methods

### addListener

▸ **addListener**(`event`, `listener`): `this`

Attaches a listener to the end of the listeners array for the specified event.
If the same listener is added multiple times for the same event, it will be invoked
multiple times when the event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event to listen for. Use `BoundedEvent.Overflow` for overflow-specific handling or other events as defined by the implementation. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to execute when the event occurs. For `BoundedEvent.Overflow`, it receives an array of elements removed due to overflow. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Defined in

[types/bounded.d.ts:62](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L62)

▸ **addListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.d.ts:66](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L66)

___

### on

▸ **on**(`event`, `listener`): `this`

An alias to `addListener`, providing a semantic way to register event listeners.
Follows the same behavior and signature as `addListener`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (`elems`: `T`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.d.ts:76](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L76)

▸ **on**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.d.ts:77](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L77)

___

### prependListener

▸ **prependListener**(`event`, `listener`): `this`

Adds the listener function to the beginning of the listeners array for the specified
event, ensuring that it is among the first to be called when the event is emitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event to listen for. Use `BoundedEvent.Overflow` for overflow-specific handling or other events as defined by the implementation. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to execute when the event occurs. For `BoundedEvent.Overflow`, it receives an array of elements removed due to overflow. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Defined in

[types/bounded.d.ts:94](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L94)

▸ **prependListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.d.ts:98](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L98)

___

### removeListener

▸ **removeListener**(`event`, `listener`): `this`

Removes the specified listener from the listener array for the event.
Only one instance of the listener is removed per call. If the listener was
added multiple times for the same event, multiple calls are required to remove
each instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"overflow"`` | The specific event from which to remove the listener. |
| `listener` | (`elems`: `T`[]) => `void` | The callback function to remove from the event's listeners array. |

#### Returns

`this`

The instance of the collection, allowing for method chaining.

#### Defined in

[types/bounded.d.ts:115](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L115)

▸ **removeListener**(`event`, `listener`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"overflow"`` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Defined in

[types/bounded.d.ts:119](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/bounded.d.ts#L119)
