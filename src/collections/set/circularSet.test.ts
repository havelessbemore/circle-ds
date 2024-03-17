import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { test as testBoundedSet } from "../../../tests/boundedSet";

import { CircularSet } from "./circularSet";

testBoundedCollection(CircularSet, Number.MAX_SAFE_INTEGER);
testBoundedSet(CircularSet);
