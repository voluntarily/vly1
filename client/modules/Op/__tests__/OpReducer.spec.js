import test from 'ava';
// import { reducerTest } from 'redux-ava';
import { getOp, getOps } from '../OpReducer';
// import { addOp, deleteOp, addOps } from '../OpActions';

// test('action for ADD_OP is working', reducerTest(
//   opReducer,
//   { data: ['foo'] },
//   addOp({
//     name: 'prank',
//     about: 'first op',
//     type: 'corporate',
//     _id: null,
//     cuid: null,
//     slug: 'first-op',
//   }),
//   { data: [{
//     name: 'prank',
//     about: 'first op',
//     type: 'corporate',
//     _id: null,
//     cuid: null,
//     slug: 'first-op',
//   }, 'foo'] },
// ));

// test('action for DELETE_OP is working', reducerTest(
//   opReducer,
//   { data: [{
//     name: 'prank',
//     about: 'first op',
//     type: 'corporate',
//     cuid: 'abc',
//     _id: 1,
//     slug: 'first-op',
//   }] },
//   deleteOp('abc'),
//   { data: [] },
// ));

// test('action for ADD_OPS is working', reducerTest(
//   opReducer,
//   { data: [] },
//   addOps([
//     {
//       name: 'prank',
//       about: 'first op',
//       type: 'corporate',
//       _id: null,
//       cuid: null,
//       slug: 'first-op',
//     },
//   ]),
//   { data: [{
//     name: 'prank',
//     about: 'first op',
//     type: 'corporate',
//     _id: null,
//     cuid: null,
//     slug: 'first-op',
//   }] },
// ));

test('getOps selector', t => {
  t.deepEqual(
    getOps({
      ops: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getOp selector', t => {
  t.deepEqual(
    getOp({
      ops: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});
