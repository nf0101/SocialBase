import express from 'express';
import { createProfile, deleteProfile, getProfiles, updateProfile } from '../controllers/profileController.js';
const router = express.Router();

router.get('/', getProfiles);
router.post('/create', createProfile);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);

export default router;
