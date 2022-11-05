const fs = require ("fs")

const path = require('path');

const productsJson = path.join(__dirname, '../data/products.json');

const listOfProducts = JSON.parse(fs.readFileSync(productsJson, 'utf8'));

const db = require('../src/database/models');

const Categories = db.Category;
const Users = db.User;
const Types = db.Types;
const Products = db.Products

console.log(Categories)
console.log(Users)
console.log(Types)
console.log(Products)

const productsControllers = {
    index: (req, res) => {
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
    createProducts: (req, res) => {
        res.render('addProducts');
    },
    prodcutsProcess: (req,res) => {
        let newProduct = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,           
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

    },
    editProduct: (req,res) =>{
       let id = req.params.id;
       let producto = listOfProducts.find(producto => producto.id == id);

        res.render("editProducts", {producto});
       
    },
    updateProducts: (req,res) => {
        let id = req.params.id;
        let newProduct = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,           
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
        newProduct.id = id;

        for (let index = 0; index < listOfProducts.length; index++) {
            const element = listOfProducts[index];
            if (element.id == id) {
                listOfProducts[index] = newProduct;
            }
        }

        fs.writeFileSync(productsJson, JSON.stringify(listOfProducts, null, 2));

        res.redirect('/products');

    },
    deleteProducts: (req, res) => {
        let id = req.params.id;
        for (let index = 0; index < listOfProducts.length; index++) {
            const element = listOfProducts[index];
            if (element.id == id) {
                listOfProducts.splice(index, 1);
            }
        }

        fs.writeFileSync(productsJson, JSON.stringify(listOfProducts, null, ' '));

        res.redirect('/products');
    },
    productsId: (req, res) => {
        let id = req.params.id;
        let producto = listOfProducts.find(producto => producto.id == id);
        res.render('descripcion', {producto});
    },
    //-----------------------------------------------------------------------------------////////
    prueba: (req,res) => {
        Categories.findAll()
            .then((categories)=>{
                 res.send({ categories })
            })
    //-------------------------------------------------------------------------------------//////
}
}
module.exports = productsControllers