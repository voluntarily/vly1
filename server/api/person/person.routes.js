import { Router } from 'express';
import * as PersonController from './person.controller';

const router = new Router();

// Get all Persons
router.route('/people').get(PersonController.getPeople);

// Get one Person by cuid
router.route('/people/:cuid').get(PersonController.getPerson);

// Add a new Person
router.route('/people').post(PersonController.addPerson);

// Delete a Person by cuid
router.route('/people/:cuid').delete(PersonController.deletePerson);


export default router;
