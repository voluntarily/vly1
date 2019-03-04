import Person from './person';
import cuid from 'cuid';
// import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all people
 * @param req
 * @param res
 * @returns void
 */
export function getPeople(req, res) {
  Person.find().sort('name').exec((err, people) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ people });
  });
}

/**
 * Save an org
 * @param req
 * @param res
 * @returns void
 */
export function addPerson(req, res) {
  if (!req.body.person.name || !req.body.person.email /* || !req.body.person.content */ ) {
    res.status(403).end();
  }

  const newPerson = new Person(req.body.person);

  // Let's sanitize inputs
  newPerson.name = sanitizeHtml(newPerson.name);
  newPerson.email = sanitizeHtml(newPerson.email);
  newPerson.cuid = cuid();
  newPerson.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ person: saved });
  });
}

/**
 * Get a single person
 * @param req
 * @param res
 * @returns void
 */
export function getPerson(req, res) {
  Person.findOne({ cuid: req.params.cuid }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ person });
  });
}

/**
 * Delete a person
 * @param req
 * @param res
 * @returns void
 */
export function deletePerson(req, res) {
  Person.findOne({ cuid: req.params.cuid }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }

    person.remove(() => {
      res.status(200).end();
    });
  });
}
