import test from 'ava';
import { reducerTest } from 'redux-ava';
import personReducer, { getPerson, getPeople } from '../PersonReducer';
import { ADD_PERSON, DELETE_PERSON, addPeople, ADD_PEOPLE } from '../PersonActions';

const testy = {
  cuid: 'abc',
  name: 'Tester McTestFace',
  email: 'testy@McTestFace.com',
  role: 'tester',
};

const testy2 = {
  cuid: 'abcd',
  name: 'testy2 McTestFace',
  email: 'testy2@McTestFace.com',
  role: 'tester',
};

test('action for ADD_PERSON is working', reducerTest(
  personReducer,
  { data: ['foo'] },
  { type: ADD_PERSON, person: testy },
  { data: [testy, 'foo'] },
));

test('action for DELETE_PERSON is working', reducerTest(
  personReducer,
  { data: [testy] },
  { type: DELETE_PERSON, cuid: 'abc' },
  { data: [] },
));

test('action for ADD_PERSONS is working', reducerTest(
  personReducer,
  { data: [] },
  { type: ADD_PEOPLE, people: [testy, testy2] },
  { data: [testy, testy2] },
));

test('getPeople selector', t => {
  t.deepEqual(
    getPeople({
      people: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getPerson selector', t => {
  t.deepEqual(
    getPerson({
      people: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});
