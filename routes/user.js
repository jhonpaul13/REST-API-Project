import express from 'express'
import {getUser,getUsers,addUser, updateUser, deleteUser } from '../controllers/Users.js'
import {verifyToken} from '../middleware/auth.js'

const router = express.Router();

router.get('/',verifyToken, getUsers)
router.get('/:id',verifyToken, getUser)
router.post('/',verifyToken, addUser)
router.put('/:id',verifyToken, updateUser)
router.delete('/:id',verifyToken, deleteUser)

export default router