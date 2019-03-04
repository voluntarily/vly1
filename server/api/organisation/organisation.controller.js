import Organisation from './organisation';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all orgs
 * @param req
 * @param res
 * @returns void
 */
export function getOrganisations(req, res) {
  Organisation.find().sort('-dateAdded').exec((err, organisations) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ organisations });
  });
}

/**
 * Save an org
 * @param req
 * @param res
 * @returns void
 */
export function addOrganisation(req, res) {
  if (!req.body.organisation.name || !req.body.organisation.about) {
    res.status(403).end();
  }

  const newOrganisation = new Organisation(req.body.organisation);

  // Let's sanitize inputs
  newOrganisation.name = sanitizeHtml(newOrganisation.name);
  newOrganisation.about = sanitizeHtml(newOrganisation.about);

  newOrganisation.slug = slug(newOrganisation.name.toLowerCase(), { lowercase: true });
  newOrganisation.cuid = cuid();
  newOrganisation.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ organisation: saved });
  });
}

/**
 * Get a single organisation
 * @param req
 * @param res
 * @returns void
 */
export function getOrganisation(req, res) {
  Organisation.findOne({ cuid: req.params.cuid }).exec((err, organisation) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ organisation });
  });
}

/**
 * Delete a organisation
 * @param req
 * @param res
 * @returns void
 */
export function deleteOrganisation(req, res) {
  Organisation.findOne({ cuid: req.params.cuid }).exec((err, organisation) => {
    if (err) {
      res.status(500).send(err);
    }

    organisation.remove(() => {
      res.status(200).end();
    });
  });
}
