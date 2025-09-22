import Auto from '../model/autosModel.js';


const getAutos = async (req, res) => {
    try {
        const autos = await Auto.find();
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

        const nuevoAuto = new Auto({ marca, modelo, año, motor, potencia, velocidadMax, combustible });
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
        const result = await Auto.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ msg: 'Auto no encontrado' });
        }

        res.json({ msg: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Tenemos un error al eliminar el auto' });
    }
};

const updateAuto = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = req.body;
        const { marca, modelo, año, motor, potencia, velocidadMax, combustible } = auto;

        if (!marca || !modelo || !año || !motor || !potencia || !velocidadMax || !combustible) {
            return res.status(400).json({ msg: 'Faltan campos obligatorios' });
        }
        
        const result = await Auto.findByIdAndUpdate(id, auto);

        if (!result) {
            return res.status(404).json({ msg: 'Auto no encontrado' });
        }

        res.json({ msg: 'Auto actualizado correctamente', auto: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Tenemos un error al actualizar el auto' });
    }
};


export{getAutos, getAutoById, addAuto, deleteAuto, updateAuto}