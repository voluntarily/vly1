import { Router } from 'express';
import * as OpportunityController from './opportunity.controller';
const router = new Router();

// Get all Opportunities
router.route('/').get(OpportunityController.getOpportunities);

// Get one Opportunity by cuid
router.route('/:cuid').get(OpportunityController.getOpportunity);

// Add a new Opportunity
router.route('/').post(OpportunityController.addOpportunity);

// Delete a Opportunity by cuid
router.route('/:cuid').delete(OpportunityController.deleteOpportunity);


export default router;
