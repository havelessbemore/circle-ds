import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedStack } from "../../tests/boundedStack";
import { ARRAY_MAX_LENGTH } from "../utils/constants";

import { CircularStack } from "./circularStack";

testBoundedCollection(CircularStack, ARRAY_MAX_LENGTH);
testBoundedStack(CircularStack);
