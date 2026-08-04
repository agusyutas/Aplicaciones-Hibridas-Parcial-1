import express from 'express';
import validarToken from "../middlewares/auth.js";
import { getMarcas, getMarcaById, addMarca, deleteMarcaById, updateMarcaById } from '../controllers/marcaController.js';

const router = express.Router();

router.get("/", validarToken, getMarcas);
router.get("/:id", validarToken, getMarcaById);
router.post("/", validarToken, addMarca);
router.delete("/:id", validarToken, deleteMarcaById);
router.put("/:id", validarToken, updateMarcaById);

export default router;
