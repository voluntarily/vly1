import test from 'ava';
import request from 'supertest';
import app from '../../../server';
import Activity from '../activity';
import { connectDB, dropDB } from '../../../util/test-helpers';

// Initial activities added into test db
const activities = [
  new Activity(
    {
      cuid: '5c951c0a-3e91-436a-81ae-59ede453672a',
      createdDateTimeUTC: '2018-12-08T09:00:00.000Z',
      lastModifiedDateTimeUTC: '2018-12-08T09:00:05.000Z',
      title: 'Growing in the garden',
      subtitle: 'Growing digitally in the garden',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
      description: 'Project to grow something in the garden',
      duration: '15 Minutes',
      location: 'Newmarket, Auckland',
      status: 'draft',
      contentUrls: ['https://youtube.com/123', 'https://coolwebsite'],
      categoryTags: {
        resourceType: 'projectOriented',
        topics: ['garden', 'robots'],
      },
      qualityRatingPoints: 150,
      topicRatingPoints: 45,
    }),
  new Activity(
    {
      cuid: '5c951c0a-3e91-436a-81ae-59ede453672b',
      createdDateTimeUTC: '2018-12-08T09:00:00.000Z',
      lastModifiedDateTimeUTC: '2018-12-08T09:00:05.000Z',
      title: 'Learn to code',
      subtitle: 'Growing digitally in the garden',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206869.svg',
      description: 'Project to grow something in the garden',
      duration: '15 Minutes',
      location: 'Newmarket, Auckland',
      status: 'draft',
      contentUrls: ['https://youtube.com/123', 'https://coolwebsite'],
      categoryTags: {
        resourceType: 'projectOriented',
        topics: ['garden', 'robots'],
      },
      qualityRatingPoints: 150,
      topicRatingPoints: 45,
    }),
];

const testActivity =
    new Activity({
      cuid: '5c951c0a-3e91-436a-81ae-59ede453672c',
      createdDateTimeUTC: '2018-12-08T09:00:00.000Z',
      lastModifiedDateTimeUTC: '2018-12-08T09:00:05.000Z',
      title: 'Robots Camp',
      subtitle: 'Growing digitally in the garden',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206870.svg',
      description: 'Project to grow something in the garden',
      duration: '15 Minutes',
      location: 'Newmarket, Auckland',
      status: 'draft',
      contentUrls: ['https://youtube.com/123', 'https://coolwebsite'],
      categoryTags: {
        resourceType: 'projectOriented',
        topics: ['garden', 'robots'],
      },
      qualityRatingPoints: 150,
      topicRatingPoints: 45,
    });


test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two activity entries', async () => {
  await Activity.create(activities).catch(() => 'Unable to create activities');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Activities', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/activities')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(activities.length, res.body.activities.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const activity = testActivity;
  activity.save();

  const res = await request(app)
    .get('/api/activities/5c951c0a-3e91-436a-81ae-59ede453672c')
    .set('Accept', 'application/json');


  t.is(res.status, 200);
  t.is(res.body.activity.title, activity.title);
});

test.serial('Should correctly add an activity', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/activities')
    .send({ activity: {
      cuid: '5c951c0a-3e91-436a-81ae-59ede453672d',
      createdDateTimeUTC: '2018-12-08T09:00:00.000Z',
      lastModifiedDateTimeUTC: '2018-12-08T09:00:05.000Z',
      title: 'Robots Camp 2',
      subtitle: 'Growing digitally in the garden',
      imgUrl: 'https://image.flaticon.com/icons/svg/206/206870.svg',
      description: 'Project to grow something in the garden',
      duration: '15 Minutes',
      location: 'Newmarket, Auckland',
      status: 'draft',
      contentUrls: ['https://youtube.com/123', 'https://coolwebsite'],
      categoryTags: {
        resourceType: 'projectOriented',
        topics: ['garden', 'robots'],
      },
      qualityRatingPoints: 150,
      topicRatingPoints: 45,
    } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedActivity = await Activity.findOne({ title: 'Robots Camp 2' }).exec();
  t.is(savedActivity.subtitle, 'Growing digitally in the garden');
});

test.serial('Should correctly delete an activity', async t => {
  t.plan(2);

  const activity =
      new Activity({
        cuid: '5c951c0a-3e91-436a-81ae-59ede453672d',
        createdDateTimeUTC: '2018-12-08T09:00:00.000Z',
        lastModifiedDateTimeUTC: '2018-12-08T09:00:05.000Z',
        title: 'Robots Camp 3',
        subtitle: 'Growing digitally in the garden',
        imgUrl: 'https://image.flaticon.com/icons/svg/206/206870.svg',
        description: 'Project to grow something in the garden',
        duration: '15 Minutes',
        location: 'Newmarket, Auckland',
        status: 'draft',
        contentUrls: ['https://youtube.com/123', 'https://coolwebsite'],
        categoryTags: {
          resourceType: 'projectOriented',
          topics: ['garden', 'robots'],
        },
        qualityRatingPoints: 150,
        topicRatingPoints: 45,
      });
  activity.save();

  const res = await request(app)
    .delete(`/api/activities/${activity.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedActivity = await Activity.findOne({ cuid: activity.cuid }).exec();
  t.is(queriedActivity, null);
});
