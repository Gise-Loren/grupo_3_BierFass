const { validationResult } = require("express-validator");
const fs = require("fs")

const path = require('path');

const db = require('../src/database/models');


const productsControllers = {
    index: async (req, res) => {
        db.Products.findAll({
            raw: true
        })
            .then(products => res.render('productos', { products }));
    },
    list: async (req, res) => {
        db.Products.findAll({
            raw: true
        })
            .then(products => res.render('productsList', { products }));
    },
    createProducts: (req, res) => {
        let categories = db.Category.findAll()
        let types = db.Types.findAll()
        Promise
            .all([categories, types])
            .then(([categories, types]) => {
                return res.render('addProducts', { categories, types })
            })
            .catch(error => res.send(error))
    },
    prodcutsProcess: async (req, res) => {
        let resultadoValidaciones = validationResult(req);
        if (resultadoValidaciones.errors.length > 0){
            let categories = db.Category.findAll()
            let types = db.Types.findAll()
            Promise
                .all([categories, types])
                .then(([categories, types]) => {
                    return res.render('addProducts', { categories, types, errors:resultadoValidaciones.mapped() })
                })
        }
        
        if(resultadoValidaciones.errors.length == 0){
            let img = req.file
            let filename = '';
            if (img) {
                filename = img.filename
            } else {
                filename = 'envase-bier.jpg'
            }
            await db.Products.create({
                id:Date.now(),
                name: req.body.name,
                type_id: req.body.type_id,
                imagen: filename,
                stock: req.body.stock,
                price: req.body.price,
                description: req.body.description,
                alcohol: req.body.alcohol,
                bitterness: req.body.bitterness,
                idealTemperature: req.body.idealTemperature,
                category_id: req.body.category_id
            })
                .then(function (product) {
                    res.redirect('/products');
                })

        }
        
    },
    editProduct: async (req, res) => {
        let categories = await db.Category.findAll({raw: true}) 
        let types = await db.Types.findAll({raw: true})
        let producto = await db.Products.findByPk(req.params.id, {
            raw: true
        })
        Promise
            .all([categories, types, producto])
            .then(([categories, types, producto]) => {
                return res.render('editProducts', { categories, types, producto })
            })


    },
    updateProducts: async (req, res) => {
        let productId = req.params.id
        let img = req.files.map(file => file.filename)
        let producto = await db.Products.findByPk(req.params.id, {
            raw: true
        })
        let filename = '';
        if (img.lenght === 1) {
            filename = img[0]
        } else {
            filename = producto.imagen 
        }
        db.Products.update({
            id: req.params.id,
            name: req.body.name,
            type_id: req.body.type_id,
            imagen: filename,
            stock: req.body.stock,
            price: req.body.price,
            description: req.body.description,
            alcohol: req.body.alcohol,
            bitterness: req.body.bitterness,
            idealTemperature: req.body.idealTemperature,
            category_id: req.body.category_id,
        },
            {
                where: { id: productId }
            })
            .then(function () {
                res.redirect('/products/'+ productId);
            })
    },
    deleteProducts: (req, res) => {
        let productId = req.params.id;

        db.Products
            .destroy({ where: { id: productId }, force: true })
            .then(() => {
                return res.redirect('/products')
            })
            .catch(error => res.send(error))
    },
    deleteProductsList: (req, res) => {
        let productId = req.params.id;

        db.Products
            .destroy({ where: { id: productId }, force: true })
            .then(() => {
                return res.redirect('/products/list')
            })
            .catch(error => res.send(error))

    },
    productsId: (req, res) => {
        db.Products.findByPk(req.params.id, {
            raw: true
        })
            .then(promProducts => res.render('descripcion', { promProducts }));
    }
}
module.exports = productsControllers