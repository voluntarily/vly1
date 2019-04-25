import { Router } from 'express';
import * as PersonController from './person.controller';

const router = new Router();

// Get all Persons
router.route('/').get(PersonController.getPeople);

// Get one Person by cuid
router.route('/:cuid').get(PersonController.getPerson);

// Add a new Person
router.route('/').post(PersonController.addPerson);

// Delete a Person by cuid
router.route('/:cuid').delete(PersonController.deletePerson);

// send validation email
router.route('/verify_email/:cuid').get(PersonController.validateEmailPerson);

export default router;
