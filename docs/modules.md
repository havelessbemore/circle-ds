[circle-ds](README.md) / Exports

# circle-ds

## Table of contents

### Classes

- [CircularArrayList](classes/CircularArrayList.md)
- [CircularDeque](classes/CircularDeque.md)
- [CircularDoublyLinkedList](classes/CircularDoublyLinkedList.md)
- [CircularLinkedDeque](classes/CircularLinkedDeque.md)
- [CircularLinkedList](classes/CircularLinkedList.md)
- [CircularLinkedQueue](classes/CircularLinkedQueue.md)
- [CircularLinkedStack](classes/CircularLinkedStack.md)
- [CircularMap](classes/CircularMap.md)
- [CircularQueue](classes/CircularQueue.md)
- [CircularSet](classes/CircularSet.md)
- [CircularStack](classes/CircularStack.md)

### Interfaces

- [Bounded](interfaces/Bounded.md)
- [Collection](interfaces/Collection.md)
- [Deque](interfaces/Deque.md)
- [List](interfaces/List.md)
- [Queue](interfaces/Queue.md)
- [Stack](interfaces/Stack.md)

### Variables

- [BoundedEvent](modules.md#boundedevent)

## Variables

### BoundedEvent

• `Const` **BoundedEvent**: `Object`

An enumeration of event types supported by [Bounded](interfaces/Bounded.md) collections.

This object defines a set of constants representing event names that can
be emitted by instances of collections implementing the [Bounded](interfaces/Bounded.md) interface.
These events signify specific actions or changes in the state of the collection.

Defined events include:
- `Overflow`: Indicates that the collection has reached its capacity, and
  as a result, one or more elements have been removed to accommodate new elements.
  This event is triggered during operations that add elements to the collection when
  it exceeds its capacity, or when capacity is updated below the collection's current
  size. Listeners attached to this event will receive an array of elements that were
  removed due to the overflow. Removed elements may be sent across 1 or more event
  instances.

This object is marked as `const` to ensure that its properties are read-only,
preventing modification of event names which could lead to inconsistencies in
event handling across the application.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Overflow` | ``"overflow"`` |

#### Defined in

[types/boundedEvent.ts:21](https://github.com/havelessbemore/circle-ds/blob/76d298e/src/types/boundedEvent.ts#L21)
