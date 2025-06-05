import express from 'express';
import {
    getActivities,
    getActivitiesWithProfiles,
    createActivity
} from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/with-profiles', getActivitiesWithProfiles);
router.post('/create', createActivity);
export default router;
