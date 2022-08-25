const express = require("express");

const app = express();

const mainRoutes = require ('./routes/mainRoutes')

const dotenv = require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen( process.env.PORT,()=> console.log("Servidor corriendo en el puerto " + process.env.PORT))

app.use(mainRoutes)