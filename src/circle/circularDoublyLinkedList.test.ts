import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedList } from "../../tests/boundedList";
import { test as testList } from "../../tests/list";
import { CircularDoublyLinkedList } from "./circularDoublyLinkedList";

testList(CircularDoublyLinkedList);
testBoundedCollection(CircularDoublyLinkedList, Number.MAX_SAFE_INTEGER);
testBoundedList(CircularDoublyLinkedList);
