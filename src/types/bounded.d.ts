import { BoundedEvent } from "..";
import { ValueOf } from "./valueOf";

/**
 * A bounded collection restricts the number of elements it can hold to a
 * specified capacity. When an attempt is made to add elements beyond this
 * capacity, the collection may either throw an error or remove existing elements
 * to make room for the new ones. If the latter, 'Overflow' events should be triggered.
 *
 * The interface provides methods to manage event listeners for two types of events:
 * - `Overflow`: Emitted when elements are removed from the collection due to it
 *   exceeding its capacity. Listeners receive an array of the removed
 *   elements as an argument. Removed elements may be sent across 1 or more
 *   event instances.
 * - General events: Allows for listening to other events within the
 *   collection. The nature of these events is determined by the concrete
 *   implementation of the interface.
 *
 * Methods include:
 * - `addListener` and `on`: Attach a listener to the end of the listeners array for a
 *   specified event. If a listener is added multiple times, it will be invoked multiple
 *   times per event.
 * - `removeListener`: Removes a listener for a specified event. If the listener was added
 *   multiple times, each call removes one instance.
 *
 * Implementers of this interface should ensure thread safety and consistency of the
 * collection's state, especially when dealing with asynchronous event listeners.
 */
export interface Bounded<T> {
  /**
   * Represents the maximum number of elements that the collection can hold. Once
   * capacity is reached, no additional elements can be added without removing
   * existing elements first. This is integral to the behavior of bounded collections,
   * providing a way to manage size.
   *
   * 1. Capacity should be a non-negative integer.
   *
   * 1. Implementers may choose to support dynamic capacity updates.
   *
   * 1. Implementers may choose to accept positive infinity (`Number.POSITIVE_INFINITY`) as
   * a valid capacity. This would effectively remove the upper limit on the collection size,
   * allowing it to grow unbounded. That said, size may still be constrained by the
   * implementation. For example, a simple array-based collection would be
   * limited to an array's maximum length (2^32 - 1 in JavaScript).
   */
  capacity: number;

  /**
   * Attaches a listener to the end of the listeners array for the specified event.
   * If the same listener is added multiple times for the same event, it will be invoked
   * multiple times when the event is emitted.
   *
   * @param event - The specific event to listen for. Use `BoundedEvent.Overflow` for
   * overflow-specific handling or other events as defined by the implementation.
   * @param listener - The callback function to execute when the event occurs.
   * For `BoundedEvent.Overflow`, it receives an array of elements removed due to overflow.
   *
   * @returns The instance of the collection, allowing for method chaining.
   */
  addListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this;
  addListener(
    event: ValueOf<typeof BoundedEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): this;

  /**
   * An alias to `addListener`, providing a semantic way to register event listeners.
   * Follows the same behavior and signature as `addListener`.
   */
  on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
  on(
    event: ValueOf<typeof BoundedEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): this;

  /**
   * Removes the specified listener from the listener array for the event.
   * Only one instance of the listener is removed per call. If the listener was
   * added multiple times for the same event, multiple calls are required to remove
   * each instance.
   *
   * @param event - The specific event from which to remove the listener.
   * @param listener - The callback function to remove from the event's listeners array.
   *
   * @returns The instance of the collection, allowing for method chaining.
   */
  removeListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this;
  removeListener(
    event: ValueOf<typeof BoundedEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): this;
}

/**
 * Configuration options for creating a bounded collection.
 */
export interface BoundedConfig {
  /**
   * The maximum number of elements that can be stored in the collection.
   *
   * Optional. Defaults to positive Infinity.
   */
  capacity?: number;
}
