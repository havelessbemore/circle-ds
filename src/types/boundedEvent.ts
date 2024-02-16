/**
 * An enumeration of event types supported by {@link Bounded} collections.
 *
 * This object defines a set of constants representing event names that can
 * be emitted by instances of collections implementing the {@link Bounded} interface.
 * These events signify specific actions or changes in the state of the collection.
 *
 * Defined events include:
 * - `Overflow`: Indicates that the collection has reached its capacity, and
 *   as a result, one or more elements have been removed to accommodate new elements.
 *   This event is triggered during operations that add elements to the collection when
 *   it exceeds its capacity, or when capacity is updated below the collection's current
 *   size. Listeners attached to this event will receive an array of elements that were
 *   removed due to the overflow. Removed elements may be sent across 1 or more event
 *   instances.
 *
 * This object is marked as `const` to ensure that its properties are read-only,
 * preventing modification of event names which could lead to inconsistencies in
 * event handling across the application.
 */
export const BoundedEvent = {
  Overflow: "overflow",
} as const;
