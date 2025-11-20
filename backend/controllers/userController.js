import User from '../model/usuariosModel.js';
import bcrypt from "bcrypt";
import JsonWebToken from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const salt = 10;

const auth = async(req, res)=>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Faltan datos' });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ msg: 'Email incorrecto' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = JsonWebToken.sign(
            { id: user._id , rol: user.rol },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            msg: "Sesión iniciada correctamente",
            jwt: token,
            name: user.name
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error del servidor" });
    }
   
}

const postUser = async (request, response) =>{
    try {
        const { name, email, password } = request.body;

        if( !name || !email || !password ){
            response.status(400).json({ msg: 'Faltan campos'})
            return;
        }

        const userData = await User.findOne({email:email});
        if(userData){
            response.status(404).json({ msg: 'El email ya existe'});
            return;
        }

        const hash = await bcrypt.hash(password, salt );
        const newUser = new User({ name, email, password:hash });
        const savedUser = await newUser.save();

        const payload = { id: savedUser._id, email: savedUser.email };
        const token = JsonWebToken.sign(payload, SECRET_KEY, { expiresIn: "2h" });

        response.status(201).json({ msg: 'Usuario guardado', id: savedUser._id, jwt: token});

    } catch (error) {
        console.error(error)
        response.status(500).json({ msg: 'No se pudo guardar el usuario'});
    }
}


const getUsers = async ( request, response) => {
    try {
        const users = await User.find();
        response.json( users );
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
        const { name, password, userId } = req.body;
        if( !name || !password ){
            res.status(400).json({ msg: 'Faltan campos obligatorios'})
            return;
        }

        console.log('El usuario que actualizo es ', userId )
        const hash = await bcrypt.hash(password, salt );
        const user = await User.findByIdAndUpdate(id, {name, password:hash});
        res.status(202).json({msg: 'Usuario Actualizado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Tenemos un error :( en el servidor ', data: {}});
    } 
}

export { postUser, getUsers, getUserById, deleteUserById, updateUserById, auth}


