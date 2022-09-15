const fs = require('fs');

const path = require('path');

const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => res.render('ageDate'),
    home: (req, res) => res.render('home'),
    cart: (req, res) => res.render('carrito'),
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) =>res.render('formUser')
}
module.exports = controller;