import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedStack } from "../tests/boundedStack";

import { CircularStack } from "./circularStack";

testBoundedCollection(CircularStack);
testBoundedStack(CircularStack);
