import { EventEmitter } from "eventemitter3";

import { BoundedEvent } from "../types/boundedEvent";
import { ValueOf } from "../types/valueOf";

export class CircularBase<T> {
  /**
   * @internal
   * The event emitter.
   *
   */
  protected _emitter: EventEmitter;

  constructor(emitter = new EventEmitter()) {
    this._emitter = emitter;
  }

  /**
   * Appends the listener function to the listeners array for the
   * {@link BoundedEvent.Overflow} event.
   *
   * * No checks are made to see if the listener has already been added.
   * Multiple calls with the same of event + listener combination will
   * result in the listener being added and called multiple times.
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
  ): this {
    this._emitter.addListener(event, listener);
    return this;
  }

  /**
   * Appends the listener function to the listeners array for the
   * {@link BoundedEvent.Overflow} event.
   *
   * * No checks are made to see if the listener has already been added.
   * Multiple calls with the same of event + listener combination will
   * result in the listener being added and called multiple times.
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
  ): this {
    this._emitter.on(event, listener);
    return this;
  }

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
  ): this {
    this._emitter.removeListener(event, listener);
    return this;
  }
}
