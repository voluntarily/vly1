import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_OP,
  DELETE_OP,
  ADD_OPS,
  addOp,
  deleteOp,
  addOps,
} from '../OpActions';

const op = {
  cuid: 'abc',
  name: 'prank',
  slug: 'first-op',
  about: 'first op',
  type: 'corporate',
};

test('should return the correct type for addOp', actionTest(
  addOp,
  op,
  { type: ADD_OP, op },
));

test('should return the correct type for deleteOp', actionTest(
  deleteOp,
  op.cuid,
  { type: DELETE_OP, cuid: op.cuid },
));

test('should return the correct type for addOps', actionTest(
  addOps,
  [op],
  { type: ADD_OPS, ops: [op] },
));
