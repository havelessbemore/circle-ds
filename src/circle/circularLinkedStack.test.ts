import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedStack } from "../../tests/boundedStack";

import { CircularLinkedStack } from "./circularLinkedStack";

testBoundedCollection(CircularLinkedStack, Number.MAX_SAFE_INTEGER);
testBoundedStack(CircularLinkedStack);
