import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Person from '../person';
import { connectDB, dropDB } from '../../../util/test-helpers';
import cuid from 'cuid';

// Initial people added into test db
const people = [
  new Person({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453674b',
    name: 'ANDREW WATKINS',
    moniker: 'Andrew',
    email: 'andrew@omgtech.co.nz',
    phone: '027 7031007',
    role: 'tester' }),
  new Person({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453673b',
    name: 'WALTER LIM',
    moniker: 'Walt',
    phone: '027 7031007',
    email: 'walter@omgtech.co.nz',
    role: 'tester' }),
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
  const p = {
    cuid: cuid(),
    name: 'Testy McTestFace',
    moniker: 'Testy',
    phone: '123 456789',
    email: 'testy@omgtech.co.nz',
    role: 'tester',
  };

  const person = new Person(p);
  person.save();

  const res = await request(app)
    .get(`/api/people/${p.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.person.name, p.name);
});

test.serial('Should correctly add a person', async t => {
  t.plan(2);
  const p = {
    name: 'Testy McTestFace',
    moniker: 'Testy',
    phone: '123 456789',
    email: 'testy@omgtech.co.nz',
    gender: 'female',
    role: 'tester',
  };

  const res = await request(app)
    .post('/api/people')
    .send({ person: p })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPerson = await Person.findOne({ name: p.name }).exec();
  t.is(savedPerson.email, p.email);
});

test.serial('Should correctly add a person and sanitise inputs', async t => {
  t.plan(2);

  const p = {
    name: 'Bobby; DROP TABLES',  // is allowed
    moniker: '<b>SQLINJECTOR</b>',
    phone: "1234<img src=x onerror=alert('img') />5678", // should remove img
    email: '<a href=mailto://testy@omgtech.co.nz>Andrew</a>', // ok
    gender: "console.log('hello world')", // ok
    role: 'tester',
  };

  const res = await request(app)
    .post('/api/people')
    .send({ person: p })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPerson = await Person.findOne({ name: p.name }).exec();
  t.is(savedPerson.phone, '12345678');
});

test.serial('Should load a person into the db and delete them via the api', async t => {
  t.plan(2);
  const p = {
    cuid: cuid(),
    name: 'Testy McTestFace',
    moniker: 'Testy',
    phone: '123 456789',
    email: 'testy@omgtech.co.nz',
    gender: 'female',
    role: 'tester',
  };
  const person = new Person(p);
  person.save();

  const res = await request(app)
    .delete(`/api/people/${person.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPerson = await Person.findOne({ cuid: p.cuid }).exec();
  t.is(queriedPerson, null);
});
