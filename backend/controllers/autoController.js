import Auto from '../model/autosModel.js';

const getAutos = async (req, res) => {
    try {
        const {id, rol} = req.user;
        const filter = rol === 'admin'?{}:{user: id}
        const autos = await Auto.find(filter).populate('user','name email');
        res.json(autos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Tenemos un error al obtener los autos' });
    }
};

const getAutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = await Auto.findById(id);

        if (!auto) {
            return res.status(404).json({ msg: 'Auto no encontrado' });
        }

        res.json(auto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Tenemos un error al buscar el auto' });
    }
};

const addAuto = async (req, res) => {
    try {
        const auto = req.body;
        const { marca, modelo, año, motor, potencia, velocidadMax, combustible } = auto;

        if (!marca || !modelo || !año || !motor || !potencia || !velocidadMax || !combustible) {
            return res.status(400).json({ msg: 'Faltan campos obligatorios' });
        }

        const userId = req.user.id;

        const nuevoAuto = new Auto({ marca, modelo, año, motor, potencia, velocidadMax, combustible, user: userId});
        await nuevoAuto.save();

        res.status(201).json({ msg: 'Auto agregado correctamente', auto: nuevoAuto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Tenemos un error al guardar el auto' });
    }
};

const deleteAuto = async (req, res) => {
    try {
        const { id } = req.params;

        const auto = await Auto.findById(id);

        if (!auto) {
            return res.status(404).json({
                msg: 'Auto no encontrado'
            });
        }

        if (
            req.user.rol !== "admin" &&
            auto.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                msg: "No tenés permisos para eliminar este auto"
            });
        }

        await Auto.findByIdAndDelete(id);

        res.json({
            msg: "Auto eliminado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Tenemos un error al eliminar el auto'
        });
    }
};

const updateAuto = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, año, motor, potencia, velocidadMax, combustible } = req.body;
        const auto = await Auto.findById(id);

        if (!auto) {
            return res.status(404).json({ msg: 'Auto no encontrado' });
        }

        if (
            req.user.rol !== "admin" &&
            auto.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                msg: "No tenés permisos para editar este auto"
            });
        }

        const autoActualizado = await Auto.findByIdAndUpdate(
            id,
            {
                marca,
                modelo,
                año,
                motor,
                potencia,
                velocidadMax,
                combustible
            },
            { new: true }
        );

        res.json({
            msg: "Auto actualizado correctamente",
            auto: autoActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Tenemos un error al actualizar el auto'
        });
    }
};

export{getAutos, getAutoById, addAuto, deleteAuto, updateAuto}