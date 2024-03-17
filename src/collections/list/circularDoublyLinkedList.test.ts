import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { testBoundedList } from "../../../tests/boundedList";
import { testList } from "../../../tests/list";
import { LINKED_MAX_LENGTH } from "../../utils/constants";
import { CircularDoublyLinkedList } from "./circularDoublyLinkedList";

testList(CircularDoublyLinkedList);
testBoundedCollection(CircularDoublyLinkedList, LINKED_MAX_LENGTH);
testBoundedList(CircularDoublyLinkedList);
