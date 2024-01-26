export type Constructor<T = object> = new (...args: unknown[]) => T;

export function applyMixins(ctor: Constructor, mixins: Constructor[]): void {
  for (const mixin of mixins) {
    const proto = mixin.prototype;
    for (const name of Object.getOwnPropertyNames(proto)) {
      const descriptor =
        Object.getOwnPropertyDescriptor(proto, name) ?? Object.create(null);
      Object.defineProperty(ctor.prototype, name, descriptor);
    }
  }
}
