import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedQueue } from "../../tests/boundedQueue";
import { LINKED_MAX_LENGTH } from "../utils/constants";

import { CircularLinkedQueue } from "./circularLinkedQueue";

testBoundedCollection(CircularLinkedQueue, LINKED_MAX_LENGTH);
testBoundedQueue(CircularLinkedQueue);
