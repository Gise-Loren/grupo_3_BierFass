const express = require("express");
const app = express();
const mainRoutes = require ('./routes/mainRoutes')
const dotenv = require('dotenv').config();
const methodOverride = require("method-override")

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.listen( process.env.PORT,()=> console.log("Servidor corriendo en el puerto " + process.env.PORT))

app.use(mainRoutes)