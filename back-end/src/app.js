const express = require("express");
const session = require('express-session');
const dotenv = require('dotenv').config();
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsApiRoutes = require('./routes/api/productsApiRoutes');
const usersApiControllers = require('./routes/api/usersApiRoutes')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const methodOverride = require("method-override");
const cookies = require('cookie-parser');
const path = require('path');
const cors = require('cors')

app.use(cors())

app.use(cookies());

app.use(methodOverride('_method'));

app.use(session({
    secret: "shhh, it's a secret",
    resave: false,
    saveUninitialized: false,
}))

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));


app.set('view engine', 'ejs');

app.set('views', path.resolve(__dirname, 'views'));

app.use(usersRoutes);

app.use('/api/users', usersApiControllers);

app.use(mainRoutes);

app.use('/products', productsRoutes);

app.use('/api/products', productsApiRoutes);

app.use(express.json());

app.listen(process.env.PORT, () => console.log("Servidor corriendo en el puerto " + process.env.PORT))







