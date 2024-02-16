/**
 * Represents a node within a SkipList.
 *
 * This internal interface defines the structure of nodes in the skip list,
 * including forward and backward pointers, the node's value, and the span
 * (width) between node levels. Each node may participate in multiple levels
 * of the list, facilitating fast searches, insertions, and deletions.
 */
export interface SkipListNode<T> {
  levels: {
    /**
     * Pointer to the next node at this level.
     */
    next: SkipListNode<T>;
    /**
     * Pointer to the previous node at this level.
     */
    prev: SkipListNode<T>;
    /**
     * The distance to the next node at this level.
     */
    width: number;
  }[];

  /**
   * The value stored in the node.
   */
  value: T;
}
