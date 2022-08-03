import express from 'express';
import { getHabits, createHabit, archiveHabit, updateHabit, supportHabit } from '../controllers/habits.js'
import { userAuth, publicAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', userAuth, getHabits);
router.post('/', userAuth, createHabit);
router.patch('/:id', userAuth, updateHabit);
router.patch('/:id/support', publicAuth, supportHabit);
router.delete('/:id', userAuth, archiveHabit);

export default router;