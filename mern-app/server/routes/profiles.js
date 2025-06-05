import express from 'express';
import { createProfile, getProfiles } from '../controllers/profileController.js';
const router = express.Router();

router.get('/', getProfiles);
router.post('/create', createProfile);

export default router;
