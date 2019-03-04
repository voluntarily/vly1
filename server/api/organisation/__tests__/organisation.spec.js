import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Organisation from '../organisation';
import { connectDB, dropDB } from '../../../util/test-helpers';

// Initial organisations added into test db
const organisations = [
  new Organisation({
    cuid: 'f34gb2bh24b24b2',
    name: 'OMGTech',
    slug: 'hello-omgtech',
    about: "All cats meow 'mern!'",
    type: 'corporate',
  }),
  new Organisation({
    cuid: 'f34gb2bh24b24b3',
    name: 'Datacom',
    slug: 'hi-datacom',
    about: "All dogs bark 'mern!'",
    type: 'corporate',
  }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two org entries', async () => {
  await Organisation.create(organisations).catch(() => 'Unable to create orgs');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Organisations', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/organisations')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(organisations.length, res.body.organisations.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const organisation = new Organisation({ cuid: 'f44gb2bh24b24b2', name: 'Foo', slug: 'bar', about: 'Hello Mern says Foo', type: 'corporate' });
  organisation.save();

  const res = await request(app)
    .get('/api/organisations/f44gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.organisation.name, organisation.name);
});

test.serial('Should correctly add a organisation', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/organisations')
    .send({ organisation: { cuid: 'f34gb2bh24b24b2', name: 'Foo', about: 'Hello', type: 'corporate' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedOrganisation = await Organisation.findOne({ name: 'Foo' }).exec();
  t.is(savedOrganisation.about, 'Hello');
});

test.serial('Should correctly delete a organisation', async t => {
  t.plan(2);

  const organisation = new Organisation({ cuid: 'f34gb2bh24b24b2', name: 'Foo', slug: 'bar', about: 'Hello Mern says Foo', type: 'corporate' });
  organisation.save();

  const res = await request(app)
    .delete(`/api/organisations/${organisation.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedOrganisation = await Organisation.findOne({ cuid: organisation.cuid }).exec();
  t.is(queriedOrganisation, null);
});
