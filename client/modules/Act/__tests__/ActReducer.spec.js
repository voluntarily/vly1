import test from 'ava';
import { reducerTest } from 'redux-ava';
import actReducer, { getAct, getActs } from '../ActReducer';
import { addAct, deleteAct, addActs } from '../ActActions';

test('action for ADD_ACT is working', reducerTest(
  actReducer,
  { data: ['foo'] },
  addAct({
    title: 'prank',
    description: 'first act',
    type: 'corporate',
    _id: null,
    cuid: null,
    slug: 'first-act',
  }),
  { data: [{
    title: 'prank',
    description: 'first act',
    type: 'corporate',
    _id: null,
    cuid: null,
    slug: 'first-act',
  }, 'foo'] },
));

test('action for DELETE_ACT is working', reducerTest(
  actReducer,
  { data: [{
    title: 'prank',
    description: 'first act',
    type: 'corporate',
    cuid: 'abc',
    _id: 1,
    slug: 'first-act',
  }] },
  deleteAct('abc'),
  { data: [] },
));

test('action for ADD_ACTS is working', reducerTest(
  actReducer,
  { data: [] },
  addActs([
    {
      title: 'prank',
      description: 'first act',
      type: 'corporate',
      _id: null,
      cuid: null,
      slug: 'first-act',
    },
  ]),
  { data: [{
    title: 'prank',
    description: 'first act',
    type: 'corporate',
    _id: null,
    cuid: null,
    slug: 'first-act',
  }] },
));

test('getActs selector', t => {
  t.deepEqual(
    getActs({
      acts: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getAct selector', t => {
  t.deepEqual(
    getAct({
      acts: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});
