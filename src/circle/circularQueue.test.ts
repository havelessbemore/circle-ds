import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedQueue } from "../tests/boundedQueue";

import { CircularQueue } from "./circularQueue";

testBoundedCollection(CircularQueue);
testBoundedQueue(CircularQueue);
