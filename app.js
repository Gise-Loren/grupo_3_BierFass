const express = require("express");
const dotenv = require('dotenv').config();
const multer = require('multer')

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.listen(process.env.PORT, () => console.log("Servidor corriendo en el puerto " + process.env.PORT))

app.set('view engine', 'ejs');

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(usersRoutes);
app.use(mainRoutes);

const session = require('express-session');

/* permite capturar la informacion que se envia desde un formulario via post en lo que es el req. body*/
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

const cookies = require('cookie-parser');
app.use(cookies());



app.use(express.json());

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);

app.use("/products", productsRoutes);
