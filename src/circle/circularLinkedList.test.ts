import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { testBoundedList } from "../../tests/boundedList";
import { testList } from "../../tests/list";
import { CircularLinkedList } from "./circularLinkedList";

testList(CircularLinkedList);
testBoundedCollection(CircularLinkedList, Number.MAX_SAFE_INTEGER);
testBoundedList(CircularLinkedList);
