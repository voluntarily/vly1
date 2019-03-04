import { Router } from 'express';
import * as OrganisationController from './organisation.controller';
const router = new Router();

// Get all Organisations
router.route('/').get(OrganisationController.getOrganisations);

// Get one organisation by cuid
router.route('/:cuid').get(OrganisationController.getOrganisation);

// Add a new Organisation
router.route('/').post(OrganisationController.addOrganisation);

// Delete a organisation by cuid
router.route('/:cuid').delete(OrganisationController.deleteOrganisation);

export default router;
