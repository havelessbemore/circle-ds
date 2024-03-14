import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { testBoundedList } from "../../tests/boundedList";
import { testList } from "../../tests/list";
import { LINKED_MAX_LENGTH } from "../utils/constants";
import { CircularLinkedList } from "./circularLinkedList";

testList(CircularLinkedList);
testBoundedCollection(CircularLinkedList, LINKED_MAX_LENGTH);
testBoundedList(CircularLinkedList);
