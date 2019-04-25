import Person from './person';
import { sendVerifyEmail } from './emails/mailer';
import cuid from 'cuid';
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
  if (!req.body.person.name || !req.body.person.email) {
    res.status(403).end();
  }

  const p = new Person(req.body.person);

  // Let's sanitize inputs
  p.name = sanitizeHtml(p.name);
  p.moniker = sanitizeHtml(p.moniker);
  p.email = sanitizeHtml(p.email);
  p.phone = sanitizeHtml(p.phone);
  p.gender = sanitizeHtml(p.gender);
  p.about = sanitizeHtml(p.about);

    // no id or cuid then this is a new record
  if (!p.cuid || p.cuid === 0) {
    // this is a new record.
    p.cuid = cuid();
  } else {
    p.isNew = false;
  }

  p.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ person: saved });
    }
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
    } else if (!person) { // not found
      res.status(404).json({ message: 'that person was not found' });
    } else {
      res.json({ person });
    }
  });
}

/**
 * Delete a person
 * @param req
 * @param res
 * @returns void
 */
export function deletePerson(req, res) {
  if (!req.params.cuid) {
    res.status(400).send(); // bad request
  }
  Person.findOne({ cuid: req.params.cuid }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!person) {
      // bad request.
      res.status(400).send();
      return;
    }
    person.remove(() => {
      res.status(200).end();
    });
  });
}

export function validateEmailPerson(req, res) {
  if (!req.params.cuid) {
    res.status(400).send(); // bad request
  }
  Person.findOne({ cuid: req.params.cuid }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!person) {
      // not found
      res.status(404).send();
      return;
    }

    sendVerifyEmail(person).then(
      () => {
        res.status(200).end();
      }
    );
  });
}
