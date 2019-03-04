import { Router } from 'express';
import * as ActivityController from './activity.controller';
const router = new Router();

// Get all Activitys
router.route('/').get(ActivityController.getActivities);

// Get one organisation by cuid
router.route('/:cuid').get(ActivityController.getActivity);

// Add a new Activity
router.route('/').post(ActivityController.addActivity);

// Delete a organisation by cuid
router.route('/:cuid').delete(ActivityController.deleteActivity);

export default router;
