export interface LinkedNode<T> {
  next?: this;
  value: T;
}

/**
 * Represents the core structural components of a linked list, encapsulating
 * the essential elements necessary for its operation.
 */
export interface LinkedCore<T> {
  /**
   * The root node of the list.
   */
  root: LinkedNode<T>;
  /**
   * The total number of nodes within the list, excluding the root node.
   */
  size: number;
  /**
   * The last node of the list.
   */
  tail: LinkedNode<T>;
}
