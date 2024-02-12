import { BoundedEvent } from "..";
import { ValueOf } from "./valueOf";

export interface Bounded<T> {
  capacity: number;

  /**
   * Appends the listener function to the listeners array for the
   * {@link BoundedEvent.Overflow} event.
   *
   * * No checks are made to see if the listener has already been added.
   * Multiple calls with the same of event + listener combination will
   * result in the listener being added and called multiple times.
   *
   * * By default, event listeners are invoked in the order they are added.
   * The `prependListener()` method can be used as an alternative to add
   * the event listener to the beginning of the listeners array.
   *
   * @param event - The name of the event.
   * @param listener - The callback function. It will
   * receive an array of elements that have been removed due to overflow.
   * This can happen when elements are added while the collection is at
   * capacity, or when capacity is reduced below the current size.
   *
   * @returns the collection.
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
   * Appends the listener function to the listeners array for the
   * {@link BoundedEvent.Overflow} event.
   *
   * * No checks are made to see if the listener has already been added.
   * Multiple calls with the same of event + listener combination will
   * result in the listener being added and called multiple times.
   *
   * * By default, event listeners are invoked in the order they are added.
   * The `prependListener()` method can be used as an alternative to add
   * the event listener to the beginning of the listeners array.
   *
   * @param event - The name of the event.
   * @param listener - The callback function. It will
   * receive an array of elements that have been removed due to overflow.
   * This can happen when elements are added while the collection is at
   * capacity, or when capacity is reduced below the current size.
   *
   * @returns the collection.
   */
  on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
  on(
    event: ValueOf<typeof BoundedEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): this;

  /**
   * Adds the listener function to the beginning of the listeners array for
   * the {@link BoundedEvent.Overflow} event.
   *
   * * No checks are made to see if the listener has already been added.
   * Multiple calls with the same of event + listener combination will
   * result in the listener being added and called multiple times.
   *
   * * Alternatively, the `addListener()` method can be used to add
   * the event listener to the end of the listeners array.
   *
   * @param event - The name of the event.
   * @param listener - The callback function. It will
   * receive an array of elements that have been removed due to overflow.
   * This can happen when elements are added while the collection is at
   * capacity, or when capacity is reduced below the current size.
   *
   * @returns the collection.
   */
  prependListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this;
  prependListener(
    event: ValueOf<typeof BoundedEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (...args: any[]) => void
  ): this;

  /**
   * Removes the specified listener from the listener array for the event.
   *
   * At most once instance of a listener will be removed. If a listener
   * has been added multiple times for the same event, this method should
   * be called once per instance.
   *
   * @param event - The name of the event.
   * @param listener - The callback function.
   *
   * @returns the collection.
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
