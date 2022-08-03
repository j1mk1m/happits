import express from 'express';
import { userAuth, publicAuth } from '../middleware/auth.js';
import { createLog, getLogs, updateLog, archiveLog, supportLog } from '../controllers/log.js';

const router = express.Router();

router.get('/', userAuth, getLogs);
router.post('/', userAuth, createLog);
router.patch('/:id/support', publicAuth, supportLog);
router.patch('/:id', userAuth, updateLog);
router.delete('/:id', userAuth, archiveLog);

export default router;