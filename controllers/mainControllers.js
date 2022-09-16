const fs = require('fs');

const path = require('path');

const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) =>res.render('ageDate'),
    processAgeDate: (req, res) => {
        /* const fechaDeNacimiento = {
    dia : document.getElementById("day"),
    mes : document.getElementById("month"),
    anio : document.getElementById("year")
}

console.log(fechaDeNacimiento) */

console.log(req.body)

/* const fullAge = (fechaDeNacimiento) => {
    const fechaActual = new Date();
console.log(fechaActual)
} */
    },
    home: (req, res) => res.render('home'),
    cart: (req, res) => res.render('carrito'),
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) =>res.render('formUser')
}
module.exports = controller;