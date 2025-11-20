import express from 'express';
import {
    getMarcas,
    getMarcaById,
    addMarca,
    deleteMarcaById,
    updateMarcaById
} from '../controllers/marcaController.js';

const router = express.Router();

router.get('/', getMarcas);
router.get('/:id', getMarcaById);
router.post('/', addMarca);
router.delete('/:id', deleteMarcaById);
router.put('/:id', updateMarcaById);

export default router;
