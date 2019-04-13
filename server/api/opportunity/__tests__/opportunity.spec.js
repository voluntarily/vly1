import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Opportunity from '../opportunity';
import { connectDB, dropDB } from '../../../util/test-helpers';

// Initial posts added into test db
const oppos = [
  new Opportunity({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672a',
    title: 'Growing in the garden',
    subtitle: 'Growing digitally in the garden',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to grow something in the garden',
    duration: '15 Minutes',
    location: 'Newmarket, Auckland',
    status: 'draft',
  }),
  new Opportunity({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672b',
    title: 'The first 100 metres',
    subtitle: 'Launching into space',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to build a simple rocket that will reach 100m',
    duration: '2 hours',
    location: 'Albany, Auckland',
    status: 'draft',
  }),

];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two oppo entries', async () => {
  await Opportunity.create(oppos).catch(() => 'Unable to create opportunities');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Opportunities', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/opportunities')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(oppos.length, res.body.opportunities.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const oppo = new Opportunity(
    {
      cuid: '5c951c0a-3e91-436a-81ae-59ede453672c',
      title: 'The first 200 metres',
      subtitle: 'Launching into space step 2',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
      description: 'Project to build a simple rocket that will reach 200m',
      duration: '2 hours',
      location: 'Albany, Auckland',
      status: 'draft',
    }
  );
  oppo.save();

  const res = await request(app)
    .get('/api/opportunities/5c951c0a-3e91-436a-81ae-59ede453672c')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.opportunity.title, oppo.title);
});

test.serial('Should correctly add an opportunity', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/opportunities')
    .send({ opportunity: {
      title: 'The first 400 metres',
      subtitle: 'Launching into space step 3',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
      description: 'Project to build a simple rocket that will reach 400m',
      duration: '4 hours',
      location: 'Albany, Auckland',
      status: 'draft',
    } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedOpportunity = await Opportunity.findOne({ title: 'The first 400 metres' }).exec();
  t.is(savedOpportunity.subtitle, 'Launching into space step 3');
});

test.serial('Should correctly delete an opportunity', async t => {
  t.plan(2);

  const opp = new Opportunity({
    cuid: '5c951c0a-3e91-436a-81ae-59ede453672e',
    title: 'The first 1000 metres',
    subtitle: 'Launching into space step 4',
    imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
    description: 'Project to build a simple rocket that will reach 1000m',
    duration: '4 hours',
    location: 'Albany, Auckland',
    status: 'draft',
  });
  opp.save();

  const res = await request(app)
    .delete(`/api/opportunities/${opp.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedOpportunity = await Opportunity.findOne({ cuid: opp.cuid }).exec();
  t.is(queriedOpportunity, null);
});
