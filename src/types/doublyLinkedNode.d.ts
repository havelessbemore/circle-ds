import { LinkedNode } from "./linkedNode";

export interface DoublyLinkedNode<T> extends LinkedNode<T> {
  prev?: this;
}
