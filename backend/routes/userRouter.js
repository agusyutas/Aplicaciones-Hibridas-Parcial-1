import express from 'express';
import { getUsers, postUser, getUserById, deleteUserById, updateUserById, auth} from '../controllers/userController.js';
import validarToken from "../middlewares/auth.js";
import isAdmin  from '../middlewares/idAdmin.js'

const router = express.Router();

router.post('/auth', auth);
router.get('/', validarToken, isAdmin, getUsers);
router.post('/', postUser);
router.get('/:id', getUserById);
router.delete('/:id', validarToken, isAdmin,  deleteUserById);
router.put('/:id', validarToken, isAdmin,  updateUserById);

export default router;