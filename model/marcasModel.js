import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MarcaSchema = new Schema({
    marca: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Marca = model("Marca", MarcaSchema);

export default Marca;
