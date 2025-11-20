import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        select:false
    },
    rol: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente',
        lowercase: true,
        trim: true
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
