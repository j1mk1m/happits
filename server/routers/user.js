import express from 'express';
import { userAuth, publicAuth } from '../middleware/auth.js';
import { getUser, requestPartner, removePartner, acceptRequest, rejectRequest, getUserInfo, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/:id', publicAuth, getUser);
router.get('/', userAuth, getUserInfo);
router.patch('/request/:id', userAuth, requestPartner);
router.patch('/remove/:id', userAuth, removePartner);
router.patch('/accept/:id', userAuth, acceptRequest);
router.patch('/reject/:id', userAuth, rejectRequest);
router.patch('/:id', userAuth, updateUser);

export default router;