import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { testBoundedList } from "../../../tests/boundedList";
import { testList as testList } from "../../../tests/list";
import { ARRAY_MAX_LENGTH } from "../../utils/constants";
import { CircularArrayList } from "./circularArrayList";

testList(CircularArrayList);
testBoundedCollection(CircularArrayList, ARRAY_MAX_LENGTH);
testBoundedList(CircularArrayList);
