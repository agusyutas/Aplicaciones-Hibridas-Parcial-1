import express from 'express';

const router = express.Router();
import { 
    getAutos, 
    getAutoById, 
    addAuto, 
    deleteAuto, 
    updateAuto 
} from '../controllers/autoController.js';

router.get('/', getAutos);
router.get('/:id', getAutoById);
router.post('/', addAuto);
router.delete('/:id', deleteAuto);
router.put('/:id', updateAuto);

export default router;




