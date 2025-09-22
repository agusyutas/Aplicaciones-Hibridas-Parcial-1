import express from 'express';
import { getUsers, postUser, getUserById, deleteUserById, updateUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', postUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUserById);

export default router;