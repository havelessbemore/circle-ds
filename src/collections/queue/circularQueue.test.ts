import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { test as testBoundedQueue } from "../../../tests/boundedQueue";
import { ARRAY_MAX_LENGTH } from "../../utils/constants";

import { CircularQueue } from "./circularQueue";

testBoundedCollection(CircularQueue, ARRAY_MAX_LENGTH);
testBoundedQueue(CircularQueue);
