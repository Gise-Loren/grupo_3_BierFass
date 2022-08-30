const productos = require ("../listOfProducts");
const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => res.render('ageDate'),
    home: (req, res) => res.render('home'),
    products: (req, res) => { 
        const industriales = [];
        const artesanales = [];
        productos.forEach(productoActual => {
            if (productoActual.categoria === "artesanal"){
                artesanales.push(productoActual);
            }
            else {
                industriales.push(productoActual);
            }
        })
        res.render('productos', {industriales, artesanales})
    },
    cart: (req, res) => res.render('carrito'),
    login: (req, res) => res.render('login'),
    register: (req, res) => res.render('register'),
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) => res.render('formUser'),
}

module.exports = controller;
