import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_PERSON,
  DELETE_PERSON,
  ADD_PEOPLE,
  addPerson,
  deletePerson,
  addPeople,
} from '../PersonActions';

const person = {
  cuid: 'abc',
  name: 'Tester McTestFace',
  email: 'person@example.com',
  role: 'tester',
};

test('should return the correct type for addPerson', actionTest(
  addPerson,
  person,
  { type: ADD_PERSON, person },
));

test('should return the correct type for deletePerson', actionTest(
  deletePerson,
  person.cuid,
  { type: DELETE_PERSON, cuid: person.cuid },
));

test('should return the correct type for addPeople', actionTest(
  addPeople,
  [person],
  { type: ADD_PEOPLE, people: [person] },
));
