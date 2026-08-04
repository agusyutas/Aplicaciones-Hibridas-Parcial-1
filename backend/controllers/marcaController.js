import Marca from '../model/marcasModel.js';

const getMarcas = async (req, res) => {
    try {
        const { id, rol } = req.user;

        const filtro =
            rol === "admin"
                ? {}
                : { user: id };

        const marcas = await Marca.find(filtro)
            .populate("user", "name email");

        res.json(marcas);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al obtener marcas"
        });
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
            return res.status(400).json({
                msg: "Faltan campos"
            });
        }

        const nuevaMarca = new Marca({
            marca,
            pais,
            user: req.user.id
        });

        await nuevaMarca.save();

        res.status(201).json({
            msg: "Marca agregada",
            marca: nuevaMarca
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al guardar marca"
        });
    }
};

const deleteMarcaById = async (req, res) => {

    try {
        const { id } = req.params;

        const marca = await Marca.findById(id);

        if (!marca) {
            return res.status(404).json({
                msg: "Marca no encontrada"
            });
        }

        if (
            req.user.rol !== "admin" &&
            marca.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                msg: "No autorizado"
            });
        }

        await Marca.findByIdAndDelete(id);

        res.json({
            msg: "Marca eliminada"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar"
        });
    }
};

const updateMarcaById = async (req, res) => {

    try {
        const { id } = req.params;

        const marcaDB = await Marca.findById(id);

        if (!marcaDB) {
            return res.status(404).json({
                msg: "Marca no encontrada"
            });
        }

        if (
            req.user.rol !== "admin" &&
            marcaDB.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                msg: "No autorizado"
            });
        }

        const marcaActualizada =
            await Marca.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

        res.json({
            msg: "Marca actualizada",
            marca: marcaActualizada
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar"
        });
    }
};

export { getMarcas, getMarcaById, addMarca, deleteMarcaById, updateMarcaById}