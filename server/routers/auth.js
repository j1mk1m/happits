import express from 'express';
import { register, login, resetPassword } from '../controllers/auth.js';
import { userAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset', userAuth, resetPassword);

export default router;