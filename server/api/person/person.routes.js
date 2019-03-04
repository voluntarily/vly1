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


export default router;
