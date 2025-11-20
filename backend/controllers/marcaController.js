import Marca from '../model/marcasModel.js';

const getMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener marcas' });
    }
};

const getMarcaById = async (req, res) => {
    try {
        const { id } = req.params;
        const marca = await Marca.findById(id);

         if (!marca) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }

        res.json(marca);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al buscar marca' });
    }
};

const addMarca = async (req, res) => {
    try {
        const { marca, pais } = req.body;

        if (!marca || !pais) {
            return res.status(400).json({ msg: 'Faltan campos obligatorios' });
        }

        const nuevaMarca = new Marca({ marca, pais });
        await nuevaMarca.save();

        res.status(201).json({ msg: 'Marca agregada correctamente', marca: nuevaMarca });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al guardar marca' });
    }
};

const deleteMarcaById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Marca.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ msg: 'Marca no encontrada' });
        }

        res.json({ msg: 'Eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar marca' });
    }
};

const updateMarcaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, pais } = req.body;

        if (!marca || !pais) {    
            return res.status(400).json({ msg: 'Faltan campos obligatorios' });
        }

        const result = await Marca.findByIdAndUpdate(
            id,
            { marca, pais },
            { new: true } 
        );

         if (!result) {
            return res.status(404).json({ msg: 'Marca no encontrada' });   
        }

        res.json({ msg: 'Marca actualizada correctamente', marca: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar marca' });
    }
};

export { getMarcas, getMarcaById, addMarca, deleteMarcaById, updateMarcaById}