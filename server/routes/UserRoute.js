import express from 'express'
import { UnfollowUser, deleteUser, followUser, getAllUsers, getUser, searchUsersByUsername, updateUser } from '../controllers/UserController.js';
import authMiddleWare from '../MiddleWare/authMiddleware.js'

const router = express.Router();
router.post('/search',searchUsersByUsername)
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',UnfollowUser)

export default router