import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_ACT,
  DELETE_ACT,
  ADD_ACTS,
  addAct,
  deleteAct,
  addActs,
} from '../ActActions';

const act = {
  cuid: 'abc',
  title: 'prank',
  slug: 'first-act',
  description: 'first act',
  type: 'corporate',
};

test('should return the correct type for addAct', actionTest(
  addAct,
  act,
  { type: ADD_ACT, act },
));

test('should return the correct type for deleteAct', actionTest(
  deleteAct,
  act.cuid,
  { type: DELETE_ACT, cuid: act.cuid },
));

test('should return the correct type for addActs', actionTest(
  addActs,
  [act],
  { type: ADD_ACTS, acts: [act] },
));
