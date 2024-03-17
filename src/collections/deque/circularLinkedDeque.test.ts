import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { test as testBoundedDeque } from "../../../tests/boundedDeque";
import { LINKED_MAX_LENGTH } from "../../utils/constants";

import { CircularLinkedDeque } from "./circularLinkedDeque";

testBoundedCollection(CircularLinkedDeque, LINKED_MAX_LENGTH);
testBoundedDeque(CircularLinkedDeque);
