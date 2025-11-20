import express from 'express';
import validarToken from "../middlewares/auth.js";
import isAdmin from "../middlewares/idAdmin.js";

const router = express.Router();
import { 
    getAutos, 
    getAutoById, 
    addAuto, 
    deleteAuto, 
    updateAuto 
} from '../controllers/autoController.js';

router.get('/', validarToken, getAutos);
router.get('/:id', validarToken, getAutoById);
router.post('/', validarToken, addAuto);
router.delete('/:id', validarToken, deleteAuto);
router.put('/:id', validarToken, updateAuto);

export default router;




