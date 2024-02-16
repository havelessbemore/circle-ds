[circle-ds](../README.md) / [Exports](../modules.md) / SkipListConfig

# Interface: SkipListConfig

Configuration options for creating a SkipList instance.

## Table of contents

### Properties

- [maxLevel](SkipListConfig.md#maxlevel)
- [p](SkipListConfig.md#p)
- [size](SkipListConfig.md#size)

## Properties

### maxLevel

• `Optional` **maxLevel**: `number`

The maximum number of levels in the skip list.

Optional. If not provided, a default value is calculated
based on the probability factor `p` and `size`

#### Defined in

[std/skipList.ts:17](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/skipList.ts#L17)

___

### p

• `Optional` **p**: `number`

The probability factor used to randomly determine the levels
of new nodes. Should be a value between 0 and 1, where a lower
value results in fewer levels on average.

Optional; If not specified, a default value is used (e.g. 0.5).

#### Defined in

[std/skipList.ts:26](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/skipList.ts#L26)

___

### size

• `Optional` **size**: `number`

The size to use to calculate the optimal max level. Ignored
if `maxLevel` is specified.

Optional. If not provided, a default value is used, such as
the maximum size supported by the implementation.

#### Defined in

[std/skipList.ts:35](https://github.com/havelessbemore/circle-ds/blob/d2834c1/src/std/skipList.ts#L35)
