import { test as testBoundedCollection } from "../tests/boundedCollection";
import { test as testBoundedMap } from "../tests/boundedMap";

import { CircularMap } from "./circularMap";

testBoundedCollection(CircularMap);
testBoundedMap(CircularMap);
