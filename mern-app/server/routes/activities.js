import express from 'express';
import {
    getActivities,
    getActivitiesWithProfiles,
    createActivity,
    updateActivity
} from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/with-profiles', getActivitiesWithProfiles);
router.post('/create', createActivity);
router.put('/update/:id', updateActivity);
export default router;
