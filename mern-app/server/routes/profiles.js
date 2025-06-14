import express from 'express';
import {
    createProfile,
    deleteProfile,
    getFilteredProfiles,
    getPaginatedProfiles,
    getProfileByUserId,
    getProfiles,
    searchProfiles,
    updateProfile
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfiles);
router.post('/create', createProfile);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);
router.get('/paginated', getPaginatedProfiles);
router.get('/search', searchProfiles);
router.get('/filtered', getFilteredProfiles); // <-- Spostato prima
router.get('/:id', getProfileByUserId);

export default router;
