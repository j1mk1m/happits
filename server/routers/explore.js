import express from 'express';
import { userAuth, publicAuth } from '../middleware/auth.js';
import { getAllUsers } from '../controllers/explore.js';
import { getExplore } from '../controllers/explore.js';

const router = express.Router();

router.get('/users', userAuth, getAllUsers);
router.get('/feed', publicAuth, getExplore);

export default router;