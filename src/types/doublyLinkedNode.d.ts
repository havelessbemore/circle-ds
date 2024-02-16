export interface DoublyLinkedNode<T> {
  next: DoublyLinkedNode<T>;
  prev: DoublyLinkedNode<T>;
  value: T;
}
