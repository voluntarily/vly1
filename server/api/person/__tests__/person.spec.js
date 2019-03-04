import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Person from '../Person';
import { connectDB, dropDB } from '../../../util/test-helpers';

// Initial people added into test db
const people = [
  new Person({ name: 'ANDREW WATKINS', email: 'andrew@omgtech.co.nz', role: 'admin' }),
  new Person({ name: 'WALTER LIM', email: 'walter@omgtech.co.nz', role: 'admin' }),
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

  const person = new Person({ name: 'TESTER', email: 'test@omgtech.co.nz', role: 'tester' });
  person.save();

  const res = await request(app)
    .get('/api/people/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.person.name, person.name);
});

test.serial('Should correctly add a person', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/people')
    .send({ person: { name: 'TESTER', email: 'test@omgtech.co.nz', role: 'tester' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPerson = await Person.findOne({ name: 'TESTER' }).exec();
  t.is(savedPerson.email, 'test@omgtech.co.nz');
});

test.serial('Should correctly delete a person', async t => {
  t.plan(2);

  const person = new Person({ name: 'TESTER', email: 'test@omgtech.co.nz', role: 'tester' });
  person.save();

  const res = await request(app)
    .delete(`/api/people/${person.email}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPerson = await Person.findOne({ email: 'test@omgtech.co.nz' }).exec();
  t.is(queriedPerson, null);
});
