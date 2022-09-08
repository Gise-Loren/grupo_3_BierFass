const fs = require('fs');
const path = require('path');
const productsJson = path.join(__dirname, '../data/products.json');
const listOfProducts = JSON.parse(fs.readFileSync(productsJson, 'utf8'));

const usersJson = path.join(__dirname, '../data/users.json');
const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const productos = require("../listOfProducts");


const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => res.render('ageDate'),
    home: (req, res) => res.render('home'),
    products: (req, res) => {
        const industriales = [];
        const artesanales = [];
        listOfProducts.forEach(productoActual => {
            if (productoActual.categoria === "artesanal") {
                artesanales.push(productoActual);
            }
            else {
                industriales.push(productoActual);
            }
        })
        res.render('productos', { industriales, artesanales })
    },
    cart: (req, res) => res.render('carrito'),
    login: (req, res) => res.render('login'),
    register: (req, res) => res.render('register'),
    registerProcess: (req, res) => {
        let newUser = {
            id: listOFUsers.length + 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            category: "user",
        }
        if (req.files) {
            newUser.img = req.files.map(file=> file.filename)
        }
        listOFUsers.push(newUser);
        fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, ' '));
        res.redirect('/products');
    },
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) =>res.render('formUser'),
    prodcutsProcess: (req,res) => {
        let newProduct = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,           
           /*  img: req.body.img, */
            stock: req.body.stock,
            price: req.body.price,
            description: req.body.description,
            alcohol: req.body.alcohol,
            bitterness: req.body.bitterness,
            idealTemperature: req.body.idealTemperature,
            categoria: req.body.categoria,
        
        } 
        if (req.files) {
            newProduct.img = req.files.map(file=> file.filename)
        }
        listOfProducts.push(newProduct);
        fs.writeFileSync(productsJson, JSON.stringify(listOfProducts, null, ' '));
        res.redirect('/products');

}
}
module.exports = controller;