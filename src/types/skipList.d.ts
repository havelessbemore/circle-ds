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
  get levels(): number;

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
   * The size used to calculate the optimal max level. Ignored
   * if `maxLevel` is specified.
   *
   * Optional. Default value depends on the implementation.
   * For example, the implementation's maximum supported size.
   */
  expectedSize?: number;

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
}

/**
 * Represents the core structural components of a skip list, encapsulating
 * the essential elements necessary for its operation. This interface is
 * central to managing and navigating the skip list.
 */
export interface SkipListCore<T> {
  /**
   * The root node of the skip list, acting as the entry point for traversal
   * operations. The root has links to the first node at every level of the
   * skip list, allowing for efficient navigation.
   */
  root: SkipNode<T>;
  /**
   * The total number of nodes within the skip list, excluding the root node.
   */
  size: number;
  /**
   * An array of tail nodes, one for each level of the skip list. Each tail
   * node represents the last node at the given level.
   */
  tails: SkipNode<T>[];
}

/**
 * Defines an entry within a skip list.
 *
 * This is useful for operations that require knowing a node's position
 * within the list, such as traversal, search, insertion, or deletion.
 */
export interface SkipEntry<T> {
  /**
   * Represents the zero-based position of the node within the skip list.
   */
  index: number;

  /**
   * A reference to the {@link SkipNode} associated with this entry.
   */
  node: SkipNode<T>;
}

/**
 * Defines a link within a skip list, connecting nodes together at a specific level.
 */
export interface SkipLink<T> {
  /**
   * A reference to the next node in the skip list at the current level.
   * If `undefined`, it signifies the end of the skip list.
   */
  next?: SkipNode<T>;

  /**
   * The distance to the next node in the skip list at this level. If the next node
   * is `undefined`, represents the distance to the end of the list. Distance is
   * defined as the number of nodes traversed when using this link.
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
  levels: SkipLink<T>[];

  /**
   * The value stored in the node.
   */
  value: T;
}

/**
 * Represents a stack of entries in a skip list; one per level.
 *
 * This is useful for operations where absolute positioning is
 * desired over relative positioning.
 */
export type SkipStack<T> = SkipEntry<T>[];
