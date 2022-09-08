const express = require("express");
const app = express();
const mainRoutes = require ('./routes/mainRoutes')
const productsRoutes = require ('./routes/productsRoutes')
const dotenv = require('dotenv').config();
const methodOverride = require("method-override")

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use("/products", productsRoutes)

app.listen( process.env.PORT,()=> console.log("Servidor corriendo en el puerto " + process.env.PORT))

app.use(mainRoutes)