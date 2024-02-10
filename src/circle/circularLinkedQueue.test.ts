import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedQueue } from "../tests/boundedQueue";

import { CircularLinkedQueue } from "./circularLinkedQueue";

testBoundedCollection(CircularLinkedQueue);
testBoundedQueue(CircularLinkedQueue);
