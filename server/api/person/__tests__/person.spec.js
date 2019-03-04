import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Person from '../person';
import { connectDB, dropDB } from '../../../util/test-helpers';

// Initial people added into test db
const people = [
  new Person({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453674b',
    name: 'ANDREW WATKINS', email: 'andrew@omgtech.co.nz', role: 'admin' }),
  new Person({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453673b',
    name: 'WALTER LIM', email: 'walter@omgtech.co.nz', role: 'admin' }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two person entries', async () => {
  await Person.create(people).catch(() => 'Unable to create people');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of people', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/people')
    .set('Accept', 'application/json');
    
  t.is(res.status, 200);
  t.deepEqual(people.length, res.body.people.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const person = new Person({ cuid: 'f34gb2bh24b24b4', name: 'Testy McTestFace', email: 'test@omgtech.co.nz', role: 'tester' });
  person.save();

  const res = await request(app)
    .get('/api/people/f34gb2bh24b24b4')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.person.name, person.name);
});

test.serial('Should correctly add a person', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/people')
    .send({ person: { cuid: '59ede453672a',
            name: 'TESTER', email: 'test@omgtech.co.nz', role: 'tester' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPerson = await Person.findOne({ name: 'TESTER' }).exec();
  t.is(savedPerson.email, 'test@omgtech.co.nz');
});

test.serial('Should correctly delete a person', async t => {
  t.plan(2);

  const person = new Person({ cuid: '59ede453672b', name: 'TESTER', email: 'test@omgtech.co.nz', role: 'tester' });
  person.save();

  const res = await request(app)
    .delete(`/api/people/${person.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPerson = await Person.findOne({ email: 'test@omgtech.co.nz' }).exec();
  t.is(queriedPerson, null);
});
