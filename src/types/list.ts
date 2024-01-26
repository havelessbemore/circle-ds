import { Deque } from "..";
import { Map } from "./map";

export interface List<V> extends Map<number, V>, Deque<V> {}
