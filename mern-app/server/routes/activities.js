import express from 'express';
import {
    getActivities,
    getActivitiesWithProfiles
} from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/with-profiles', getActivitiesWithProfiles);

export default router;
