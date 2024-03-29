import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { testBoundedList } from "../../../tests/boundedList";
import { testList } from "../../../tests/list";
import { test as testSkipList } from "../../../tests/skipList";
import { LINKED_MAX_LENGTH } from "../../utils/constants";
import { CircularSkipList } from "./circularSkipList";

testList(CircularSkipList);
testBoundedCollection(CircularSkipList, LINKED_MAX_LENGTH);
testBoundedList(CircularSkipList);
testSkipList(CircularSkipList);
