import Opportunity from './opportunity';
import cuid from 'cuid';
// import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all Opportunities
 * @param req
 * @param res
 * @returns void
 */
export function getOpportunities(req, res) {
  Opportunity.find().sort('-dateAdded').exec((err, opportunities) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ opportunities });
  });
}

/**
 * Save an Opportunity
 * @param req
 * @param res
 * @returns void
 */
export function addOpportunity(req, res) {
  if (!req.body.opportunity.title || !req.body.opportunity.duration || !req.body.opportunity.status) {
    res.status(403).end();
    return;
  }
  const op = new Opportunity(req.body.opportunity);
  // always sanitize inputs that might get displayed on page.
  op.title = sanitizeHtml(op.title);
  op.subtitle = sanitizeHtml(op.subtitle);
  op.description = sanitizeHtml(op.description);
  op.duration = sanitizeHtml(op.duration);
  op.location = sanitizeHtml(op.location);

  // no id or cuid then this is a new record
  if (!op.cuid || op.cuid === 0) {
    // this is a new record.
    op.cuid = cuid();
  } else {
    op.isNew = false;
  }

  op.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ opportunity: saved });
    }
  });
}

/**
 * Get a single Opportunity
 * @param req
 * @param res
 * @returns void
 */
export function getOpportunity(req, res) {
  Opportunity.findOne({ cuid: req.params.cuid }).exec((err, opportunity) => {
    if (err) {
      res.status(500).send(err);
    } else if (!opportunity) { // not found
      res.status(404).json({ message: 'that opportunity was not found' });
    } else {
      res.json({ opportunity });
    }
  });
}

/**
 * Delete a Opportunity
 * @param req
 * @param res
 * @returns void
 */
export function deleteOpportunity(req, res) {
  if (!req.params.cuid) {
    res.status(400).send(); // bad request
  }
  Opportunity.findOne({ cuid: req.params.cuid }).exec((err, opportunity) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!opportunity) {
      // bad request.
      res.status(400).send();
      return;
    }
    opportunity.remove(() => {
      res.status(200).end();
    });
  });
}
