const path = require('path');

const controller = {
    index: (req,res) => res.sendFile(path.join(__dirname,"../views/prueba.html")),
    ageDate: (req,res) => res.sendFile(path.join(__dirname,"../views/ageDate.html")),
    home: (req,res) => res.sendFile(path.join(__dirname,"../views/home.html")),
    products: (req,res) => res.sendFile(path.join(__dirname,"../views/productos.html")),
    cart: (req,res) => res.sendFile(path.join(__dirname,"../views/carrito.html")),
    login: (req,res) => res.sendFile(path.join(__dirname,"../views/login.html")),
    register: (req,res) => res.sendFile(path.join(__dirname,"../views/register.html")),
}

module.exports = controller;
