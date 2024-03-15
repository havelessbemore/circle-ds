import { test as testBoundedCollection } from "../../tests/boundedCollection";
import { test as testBoundedStack } from "../../tests/boundedStack";
import { LINKED_MAX_LENGTH } from "../utils/constants";

import { CircularLinkedStack } from "./circularLinkedStack";

testBoundedCollection(CircularLinkedStack, LINKED_MAX_LENGTH);
testBoundedStack(CircularLinkedStack);
