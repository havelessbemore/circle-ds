import { EventEmitter } from "eventemitter3";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { CircularBase } from "./circularBase";
import { BoundedEvent } from "../types/boundedEvent";

describe(CircularBase.name, () => {
  let circularBase: CircularBase<unknown>;
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
    circularBase = new CircularBase(emitter);
  });

  describe("addListener()", () => {
    test("should add a new listener and call it when the event is emitted", () => {
      const mockListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, mockListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(mockListener).toHaveBeenCalledWith(["test"]);
    });

    test("should allow multiple listeners for the same event", () => {
      const firstListener = vi.fn();
      const secondListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, firstListener);
      circularBase.addListener(BoundedEvent.Overflow, secondListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(firstListener).toHaveBeenCalled();
      expect(secondListener).toHaveBeenCalled();
    });

    test("should invoke listeners in the order they were added", () => {
      const callOrder: string[] = [];
      const firstListener = () => callOrder.push("first");
      const secondListener = () => callOrder.push("second");
      circularBase.addListener(BoundedEvent.Overflow, firstListener);
      circularBase.addListener(BoundedEvent.Overflow, secondListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["first", "second"]);
    });

    test("should support adding the same listener multiple times for the same event", () => {
      const mockListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, mockListener);
      circularBase.addListener(BoundedEvent.Overflow, mockListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(mockListener).toHaveBeenCalledTimes(2);
    });

    test("should not interfere with other events when adding a listener", () => {
      const overflowListener = vi.fn();
      const otherListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, overflowListener);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      circularBase.addListener("otherEvent" as any, otherListener);

      emitter.emit(BoundedEvent.Overflow, ["overflow"]);
      emitter.emit("otherEvent", ["other"]);
      expect(overflowListener).toHaveBeenCalledWith(["overflow"]);
      expect(otherListener).toHaveBeenCalledWith(["other"]);
    });

    test("should return the collection instance to allow method chaining", () => {
      const mockListener = vi.fn();
      const result = circularBase.addListener(
        BoundedEvent.Overflow,
        mockListener
      );

      expect(result).toBe(circularBase);
    });

    test("should not affect previously added listeners when a new listener is added", () => {
      const firstListener = vi.fn();
      const secondListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, firstListener);

      emitter.emit(BoundedEvent.Overflow, ["initial"]);
      expect(firstListener).toHaveBeenCalledTimes(1);

      circularBase.addListener(BoundedEvent.Overflow, secondListener);
      emitter.emit(BoundedEvent.Overflow, ["subsequent"]);
      expect(firstListener).toHaveBeenCalledTimes(2);
      expect(secondListener).toHaveBeenCalledTimes(1);
    });
  });

  describe("removeListener()", () => {
    test("removes a specific listener from receiving further events", () => {
      const mockListener = vi.fn();
      circularBase.addListener(BoundedEvent.Overflow, mockListener);
      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(mockListener).toHaveBeenCalledTimes(1);
      circularBase.removeListener(BoundedEvent.Overflow, mockListener);
      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(mockListener).toHaveBeenCalledTimes(1);
    });

    test("does not affect other listeners for the same event", () => {
      const firstListener = vi.fn();
      const secondListener = vi.fn();
      circularBase.on(BoundedEvent.Overflow, firstListener);
      circularBase.on(BoundedEvent.Overflow, secondListener);

      circularBase.removeListener(BoundedEvent.Overflow, firstListener);
      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(firstListener).not.toHaveBeenCalled();
      expect(secondListener).toHaveBeenCalledTimes(1);
    });

    test("does not throw when removing a non-existent listener", () => {
      const nonAddedListener = vi.fn();
      expect(() =>
        circularBase.removeListener(BoundedEvent.Overflow, nonAddedListener)
      ).not.toThrow();
    });
  });
});
