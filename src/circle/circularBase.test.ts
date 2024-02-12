import EventEmitter from "events";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { CircularBase } from "./CircularBase";
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

  describe("prependListener()", () => {
    test("should call a listener added with prependListener before a listener added with on", () => {
      const callOrder: string[] = [];
      const firstListener = () => callOrder.push("first");
      const prependedListener = () => callOrder.push("prepended");

      circularBase.on(BoundedEvent.Overflow, firstListener);
      circularBase.prependListener(BoundedEvent.Overflow, prependedListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["prepended", "first"]);
    });

    test("should maintain the order of listeners added with prependListener", () => {
      const callOrder: string[] = [];
      const prependedFirst = () => callOrder.push("prependedFirst");
      const prependedSecond = () => callOrder.push("prependedSecond");

      circularBase.prependListener(BoundedEvent.Overflow, prependedSecond);
      circularBase.prependListener(BoundedEvent.Overflow, prependedFirst);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["prependedFirst", "prependedSecond"]);
    });

    test("should not affect the invocation of already added listeners", () => {
      const callOrder: string[] = [];
      const firstListener = () => callOrder.push("first");
      const secondListener = () => callOrder.push("second");

      circularBase.on(BoundedEvent.Overflow, firstListener);
      circularBase.prependListener(BoundedEvent.Overflow, secondListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["second", "first"]);
    });

    test("should allow multiple listeners to be prepended in reverse order", () => {
      const callOrder: string[] = [];
      const listeners = [
        () => callOrder.push("first"),
        () => callOrder.push("second"),
        () => callOrder.push("third"),
      ];

      listeners
        .reverse()
        .forEach(listener =>
          circularBase.prependListener(BoundedEvent.Overflow, listener)
        );

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["first", "second", "third"]);
    });

    test("should work correctly when mixed with removeListener", () => {
      const callOrder: string[] = [];
      const listenerToRemove = () => callOrder.push("removed");
      const remainingListener = () => callOrder.push("remaining");

      circularBase.prependListener(BoundedEvent.Overflow, listenerToRemove);
      circularBase.prependListener(BoundedEvent.Overflow, remainingListener);

      circularBase.removeListener(BoundedEvent.Overflow, listenerToRemove);
      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(callOrder).toEqual(["remaining"]);
    });

    test("should not throw or fail when prepending to an event with no existing listeners", () => {
      const prependedListener = vi.fn();
      expect(() =>
        circularBase.prependListener(BoundedEvent.Overflow, prependedListener)
      ).not.toThrow();

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(prependedListener).toHaveBeenCalledTimes(1);
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

    test("successfully removes listeners added with prependListener", () => {
      const prependedListener = vi.fn();
      circularBase.prependListener(BoundedEvent.Overflow, prependedListener);

      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(prependedListener).toHaveBeenCalledTimes(1);

      circularBase.removeListener(BoundedEvent.Overflow, prependedListener);
      emitter.emit(BoundedEvent.Overflow, ["test"]);
      expect(prependedListener).toHaveBeenCalledTimes(1);
    });
  });
});
