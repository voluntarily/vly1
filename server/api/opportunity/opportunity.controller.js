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

  const newOpportunity = new Opportunity(req.body.opportunity);

  // Let's sanitize inputs
  newOpportunity.title = sanitizeHtml(newOpportunity.title);
  // newOpportunity.name = sanitizeHtml(newOpportunity.name);
  // newOpportunity.content = sanitizeHtml(newOpportunity.content);

//  newOpportunity.slug = slug(newOpportunity.title.toLowerCase(), { lowercase: true });
  newOpportunity.cuid = cuid();
  newOpportunity.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ opportunity: saved });
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
    }
    res.json({ opportunity });
  });
}

/**
 * Delete a Opportunity
 * @param req
 * @param res
 * @returns void
 */
export function deleteOpportunity(req, res) {
  Opportunity.findOne({ cuid: req.params.cuid }).exec((err, opportunity) => {
    if (err) {
      res.status(500).send(err);
    }

    opportunity.remove(() => {
      res.status(200).end();
    });
  });
}
