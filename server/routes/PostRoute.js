import express from 'express'
import { createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost } from '../controllers/PostController.js';

const router = express.Router()

router.post('/', createPost)

router.get('/:id', getPost)
router.put('/:id', updatePost)
router.put('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimeLinePosts)
export default router