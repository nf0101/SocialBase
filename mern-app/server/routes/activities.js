import express from 'express';
import {
    getActivities,
    getActivitiesWithProfiles,
    createActivity,
    updateActivity,
    deleteActivity, getPaginatedActivities, getActivitiesByUserId
} from '../controllers/activitiesController.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/with-profiles', getActivitiesWithProfiles);
router.post('/create', createActivity);
router.put('/update/:id', updateActivity);
router.delete('/delete/:id', deleteActivity);
router.get('/paginated', getPaginatedActivities);
router.get('/of-profile/:userId', getActivitiesByUserId);

export default router;
