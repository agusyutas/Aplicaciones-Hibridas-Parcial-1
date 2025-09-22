import User from '../model/usuariosModel.js';

const getUsers = async ( request, response) => {
    try {
        const users = await User.find();
        response.json( users );
    } catch (error) {
        console.error(error)
        response.status(500).json({ msg: 'Tenemos un error'});
    }
}

const postUser = async (request, response) =>{
    try {
        const { name, email, password } = request.body;

        if( !name || !email || !password ){
            response.status(400).json({ msg: 'Faltan campos'})
            return;
        }

        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();

        response.status(201).json({ msg: 'Usuario guardado', user: savedUser});

    } catch (error) {
        console.error(error)
        response.status(500).json({ msg: 'Tenemos un error'});
    }
}

const getUserById = async ( req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if( user){
            res.status(200).json({msg:'Usuario por ID ', data: user});
        } else {
            res.status(404).json({msg:'No se encontro el usuario', data: {}});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error', data: {}});

    }
}

const deleteUserById = async ( req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if( user){
            res.status(200).json({msg:'Usuario Eliminado ', data: user._id});
        } else {
            res.status(404).json({msg:'No se encontro el usuario', data: {}});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error', data: {}});
    }

}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;
        if( !name || !password ){
            res.status(400).json({ msg: 'Faltan campos obligatorios'})
            return;
        }
        const user = await User.findByIdAndUpdate(id, {name, password});
        console.log({user});
        res.status(202).json({msg: 'Usuario Actualizado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    }
}

export { postUser, getUsers, getUserById, deleteUserById, updateUserById }


