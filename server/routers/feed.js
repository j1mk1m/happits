import express from 'express';
import { userAuth } from '../middleware/auth.js';
import { getFeed } from '../controllers/feed.js';

const router = express.Router();

router.get('/', userAuth, getFeed);

export default router;