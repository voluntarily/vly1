import Activity from './activity';
import cuid from 'cuid';
// import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all Activities
 * @param req
 * @param res
 * @returns void
 */
export function getActivities(req, res) {
  Activity.find().sort('-dateAdded').exec((err, activities) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activities });
  });
}

/**
 * Save an Activity
 * @param req
 * @param res
 * @returns void
 */
export function addActivity(req, res) {
  if (!req.body.activity.title || !req.body.activity.duration || !req.body.activity.status) {
    res.status(403).end();
  }

  const newActivity = new Activity(req.body.activity);

  // Let's sanitize inputs
  newActivity.title = sanitizeHtml(newActivity.title);
  // newActivity.name = sanitizeHtml(newActivity.name);
  // newActivity.content = sanitizeHtml(newActivity.content);

//  newActivity.slug = slug(newActivity.title.toLowerCase(), { lowercase: true });
  newActivity.cuid = cuid();
  newActivity.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity: saved });
  });
}

/**
 * Get a single Activity
 * @param req
 * @param res
 * @returns void
 */
export function getActivity(req, res) {
  Activity.findOne({ cuid: req.params.cuid }).exec((err, activity) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ activity });
  });
}

/**
 * Delete a Activity
 * @param req
 * @param res
 * @returns void
 */
export function deleteActivity(req, res) {
  Activity.findOne({ cuid: req.params.cuid }).exec((err, activity) => {
    if (err) {
      res.status(500).send(err);
    }

    activity.remove(() => {
      res.status(200).end();
    });
  });
}
