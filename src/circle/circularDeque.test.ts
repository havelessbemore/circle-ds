import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedDeque } from "../tests/boundedDeque";

import { CircularDeque } from "./circularDeque";

testBoundedCollection(CircularDeque);
testBoundedDeque(CircularDeque);
