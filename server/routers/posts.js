import express from 'express';
import { getPosts, createPost, archivePost, updatePost, supportPost } from '../controllers/posts.js'
import { userAuth, publicAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', userAuth, getPosts);
router.post('/', userAuth, createPost);
router.patch('/:id/support', publicAuth, supportPost);
router.patch('/:id', userAuth, updatePost);
router.delete('/:id', userAuth, archivePost);

export default router;