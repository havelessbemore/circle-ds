import { test as testBoundedCollection } from "../../../tests/boundedCollection";
import { test as testBoundedDeque } from "../../../tests/boundedDeque";
import { ARRAY_MAX_LENGTH } from "../../utils/constants";

import { CircularDeque } from "./circularDeque";

testBoundedCollection(CircularDeque, ARRAY_MAX_LENGTH);
testBoundedDeque(CircularDeque);
