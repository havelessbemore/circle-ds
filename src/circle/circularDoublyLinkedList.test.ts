import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { testBoundedList } from "../../tests/boundedList";
import { testList } from "../../tests/list";
import { CircularDoublyLinkedList } from "./circularDoublyLinkedList";

testList(CircularDoublyLinkedList);
testBoundedCollection(CircularDoublyLinkedList, Number.MAX_SAFE_INTEGER);
testBoundedList(CircularDoublyLinkedList);
