import { describe, expect, test } from "vitest";

import { applyMixins } from "./mixins";

// Define mixin classes
class MixinOne {
  get mixinOneProp(): number {
    return 1;
  }

  mixinOneMethod() {
    return "MixinOne";
  }
}

class MixinTwo {
  private _mixinTwoProp = 2;

  get mixinTwoProp(): number {
    return this._mixinTwoProp;
  }

  set mixinTwoProp(value: number) {
    this._mixinTwoProp = value;
  }

  mixinTwoMethod() {
    return "MixinTwo";
  }
}

// Define the target class
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class TargetClass {
  targetMethod() {
    return "TargetClass";
  }
}

// Create an interface which merges the target class with the mixins
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface TargetClass extends MixinOne, MixinTwo {}

// Apply the mixins into the target class at runtime
applyMixins(TargetClass, [MixinOne, MixinTwo]);

describe("applyMixins()", () => {
  test("target class should have its own methods", () => {
    const targetInstance = new TargetClass();
    expect(typeof targetInstance.targetMethod).toBe("function");
    expect(targetInstance.targetMethod()).toBe("TargetClass");
  });

  test("target class should have mixin methods", () => {
    const targetInstance = new TargetClass();
    expect(typeof targetInstance.mixinOneMethod).toBe("function");
    expect(typeof targetInstance.mixinTwoMethod).toBe("function");
    expect(targetInstance.mixinOneMethod()).toBe("MixinOne");
    expect(targetInstance.mixinTwoMethod()).toBe("MixinTwo");
  });

  test("target class should have mixin property from MixinOne", () => {
    const targetInstance = new TargetClass();
    expect(targetInstance.mixinOneProp).toBe(1);
  });

  test("target class should uninitialized mixin property from MixinTwo", () => {
    const targetInstance = new TargetClass();

    // MixinTwo's getter relies on an instance property that
    // is not copied. Therefore, the property is undefined.
    expect(targetInstance.mixinTwoProp).toBeUndefined();
  });

  test("target class should be able to set mixin property from MixinTwo", () => {
    const targetInstance = new TargetClass();

    // MixinTwo's setter sets the instance property to the given value.
    targetInstance.mixinTwoProp = 3;
    expect(targetInstance.mixinTwoProp).toBe(3);
  });
});
