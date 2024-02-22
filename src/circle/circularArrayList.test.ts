import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedList } from "../../tests/boundedList";
import { test as testList } from "../../tests/list";
import { ARRAY_MAX_LENGTH } from "../utils/constants";
import { CircularArrayList } from "./circularArrayList";

testList(CircularArrayList);
testBoundedCollection(CircularArrayList, ARRAY_MAX_LENGTH);
testBoundedList(CircularArrayList);
