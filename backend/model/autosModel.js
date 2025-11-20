import mongoose from "mongoose";

const autoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  año: {
    type: Number,
    required: true
  },
  motor: String,
  potencia: String,
  velocidadMax: String,
  combustible: String,
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

const Auto = mongoose.model("Auto", autoSchema);

export default Auto;
