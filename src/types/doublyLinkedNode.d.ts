import { LinkedNode } from "./linkedNode";

export interface DoublyLinkedNode<T> extends LinkedNode<T> {
  prev?: this;
}

/**
 * Represents the core structural components of a doubly linked list,
 * encapsulating the essential elements necessary for its operation.
 */
export interface DoublyLinkedCore<T> {
  /**
   * The root node of the list.
   */
  root: DoublyLinkedNode<T>;
  /**
   * The total number of nodes within the list, excluding the root node.
   */
  size: number;
  /**
   * The last node of the list.
   */
  tail: DoublyLinkedNode<T>;
}
