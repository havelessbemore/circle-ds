import { List } from "..";

/**
 * Skip lists are a probabilistic data structure that allows for efficient
 * search, insertion, deletion, and access operations. A skip list maintains
 * multiple layers of linked lists, with each layer representing a subset of
 * the elements.
 *
 * Skip lists use randomness to maintain balance among the levels, with the
 * `p` property controlling the probability of level assignment for new nodes,
 * and `maxLevel` determining the maximum height a skip list node can have.
 * This structure allows for operations that are efficient on average,
 * typically achieving logarithmic time complexity for search, insert,
 * and delete operations.
 */
export interface SkipList<T> extends List<T> {
  /**
   * The current number of levels in the skip list.
   */
  levels: readonly number;

  /**
   * The maximum number of levels in the skip list.
   */
  maxLevel: number;

  /**
   * The probability factor used to randomly determine the levels
   * of new nodes. Should be a value between 0 and 1, where a lower
   * value results in fewer levels on average.
   */
  p: number;
}

/**
 * Configuration options for creating a SkipList instance.
 */
export interface SkipListConfig {
  /**
   * The maximum number of levels in the skip list.
   *
   * Optional. A default value is calculated based
   * on the probability factor `p` and `expectedSize`
   */
  maxLevel?: number;

  /**
   * The probability factor used to randomly determine the levels
   * of new nodes. Should be a value between 0 and 1, where a lower
   * value results in fewer levels on average.
   *
   * Optional; Default value depends on the implementation.
   * For example, 0.5.
   */
  p?: number;

  /**
   * The size used to calculate the optimal max level. Ignored
   * if `maxLevel` is specified.
   *
   * Optional. Default value depends on the implementation.
   * For example, the implementation's maximum supported size.
   */
  expectedSize?: number;
}

/**
 * Represents a level in a skip list node.
 *
 * A skip list level is part of a skip list node, which is used to implement
 * an efficient list with probabilistic balancing. Each level in a skip list
 * node contains a pointer to the next node at that level, along with the
 * span (distance) to the next node. This allows for jumping large distances
 * in a list, enabling fast traversal, insertions and deletions.
 */
export interface SkipLevel<T> {
  /**
   * Points to the next {@link SkipNode} in the skip list at the current level.
   * If `undefined`, it indicates the end of the list at this level.
   */
  next?: SkipNode<T>;

  /**
   * The distance to the next node at the current level.
   */
  span: number;
}

/**
 * Represents a node within a SkipList.
 *
 * Skip list nodes are the fundamental elements of the list, with each node
 * potentially participating in multiple levels of the skip list. This
 * enables the skip list's fast traversal, insertions and deletions.
 */
export interface SkipNode<T> {
  /**
   * The levels this node extends to.
   */
  levels: SkipLevel<T>[];

  /**
   * The value stored in the node.
   */
  value: T;
}

/**
 * Represents a stack of entries in a SkipList; one per level.
 */
export type SkipStack<T> = SkipEntry<T>[];

/**
 * Represents an entry in a skip list.
 *
 * The entry points to a specific node in the list and its
 * corresponding index (position in the list).
 */
export interface SkipEntry<T> {
  index: number;
  node: SkipNode<T>;
}
