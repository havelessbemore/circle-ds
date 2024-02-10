import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedDeque } from "../tests/boundedDeque";

import { CircularLinkedDeque } from "./circularLinkedDeque";

testBoundedCollection(CircularLinkedDeque);
testBoundedDeque(CircularLinkedDeque);
