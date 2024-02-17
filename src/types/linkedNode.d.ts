export interface LinkedNode<T> {
  next?: LinkedNode<T>;
  value: T;
}
