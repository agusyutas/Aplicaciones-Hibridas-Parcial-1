import chalk from "chalk";
import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import routerAPI from "./routes/index.js";

dotenv.config();
const port = process.env.PORT;
const URI_DB = process.env.URI_DB;

mongoose.connect(URI_DB);
const db = mongoose.connection;

db.on('error', () => { console.error('No nos podemos conectar con la DB')});
db.once('open', () => { console.info('Conexión correcta con la DB')});

const app = express();

app.use(express.json());

app.use( cors() );

app.use('/', express.static('public'));

routerAPI(app);

app.listen( port, () => {
    console.log(`API en el puerto ${port}`);
})

