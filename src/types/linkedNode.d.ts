export interface LinkedNode<T> {
  next?: this;
  value: T;
}
