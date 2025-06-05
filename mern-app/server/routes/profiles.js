import express from 'express';
import { createProfile, getProfiles, updateProfile } from '../controllers/profileController.js';
const router = express.Router();

router.get('/', getProfiles);
router.post('/create', createProfile);
router.put('/update/:id', updateProfile);

export default router;
