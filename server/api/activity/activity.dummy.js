import Activity from './activity';

export default function () {
  Activity.estimatedDocumentCount().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const activityList = [
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
      },
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
      },
      {
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
      },
    ];


    const a0 = new Activity(activityList[0]);
    const a1 = new Activity(activityList[1]);
    const a2 = new Activity(activityList[2]);

    Activity.create([a0, a1, a2], (error) => {
      if (!error) {
      //  console.log('Loaded Activities....');
      }
    });
  });
}
