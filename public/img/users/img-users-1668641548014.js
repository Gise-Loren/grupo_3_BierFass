const express = require("express");
const session = require('express-session');
const dotenv = require('dotenv').config();
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride = require("method-override");

const cookies = require('cookie-parser');
app.use(cookies());
app.use(methodOverride('_method'));
app.use(session({
    secret: "shhh, it's a secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(usersRoutes);

app.use(mainRoutes);

app.use('/products', productsRoutes);

app.use(express.json());

app.listen(process.env.PORT, () => console.log("Servidor corriendo en el puerto " + process.env.PORT))







