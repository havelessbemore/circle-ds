[circle-ds](../README.md) / [Exports](../modules.md) / CircularSkipListConfig

# Interface: CircularSkipListConfig

## Hierarchy

- `BoundedConfig`

- `SkipListConfig`

  ↳ **`CircularSkipListConfig`**

## Table of contents

### Properties

- [capacity](CircularSkipListConfig.md#capacity)
- [expectedSize](CircularSkipListConfig.md#expectedsize)
- [maxLevel](CircularSkipListConfig.md#maxlevel)
- [p](CircularSkipListConfig.md#p)

## Properties

### capacity

• `Optional` **capacity**: `number`

The maximum number of elements that can be stored in the collection.

Optional. Defaults to positive Infinity.

#### Inherited from

BoundedConfig.capacity

#### Defined in

[types/bounded.d.ts:112](https://github.com/havelessbemore/circle-ds/blob/851e17d/src/types/bounded.d.ts#L112)

___

### expectedSize

• `Optional` **expectedSize**: `number`

The size used to calculate the optimal max level. Ignored
if `maxLevel` is specified.

Optional. Default value depends on the implementation.
For example, the implementation's maximum supported size.

#### Inherited from

SkipListConfig.expectedSize

#### Defined in

[types/skipList.d.ts:105](https://github.com/havelessbemore/circle-ds/blob/851e17d/src/types/skipList.d.ts#L105)

___

### maxLevel

• `Optional` **maxLevel**: `number`

The maximum number of levels in the skip list.

Optional. A default value is calculated based
on the probability factor `p` and `expectedSize`

#### Inherited from

SkipListConfig.maxLevel

#### Defined in

[types/skipList.d.ts:113](https://github.com/havelessbemore/circle-ds/blob/851e17d/src/types/skipList.d.ts#L113)

___

### p

• `Optional` **p**: `number`

The probability factor used to randomly determine the levels
of new nodes. Should be a value between 0 and 1, where a lower
value results in fewer levels on average.

Optional; Default value depends on the implementation.
For example, 0.5.

#### Inherited from

SkipListConfig.p

#### Defined in

[types/skipList.d.ts:123](https://github.com/havelessbemore/circle-ds/blob/851e17d/src/types/skipList.d.ts#L123)
