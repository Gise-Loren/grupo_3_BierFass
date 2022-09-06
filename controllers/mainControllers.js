const productos = require("../listOfProducts");
const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => res.render('ageDate'),
    home: (req, res) => res.render('home'),
    products: (req, res) => {
        const industriales = [];
        const artesanales = [];
        productos.forEach(productoActual => {
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
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) => res.render('formUser'),
    prodcutsPru: (req, res) => {
        res.render("productos");
    },
    prodcutsProcess: (req,res) => {
        let newProdcut = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,           
            img: req.body.img,
            stock: req.body.stock,
            price: req.body.price,
            description: req.body.description,
            alcohol: req.body.alcohol,
            bitterness: req.body.bitterness,
            idealTemperature: req.body.idealTemperature,
            categoria: req.body.categoria,
        
        } 
        /* dateBase.push(newProduct) // pushamos a el array dataBase la nueva estructura
        fs.writeFileSync(path.join, JSON.stringify(verCONSTANTE DONDE SE GUARDAN TODOS LOS PRODCUTS., null, ' '))
        res.redirect('/' */
}
}
module.exports = controller;

// REVISAR - PARA AGREGAR PRODCUTOS  - TERMINAR DETALLES. 
// add products . 
/* addProducts = function (req, res) {
   
    const newProduct = {
    id,
    name,
    type,
    img,
    stock,
    price,
    description,
    alcohol,
    bitterness,
    idealTemperature,
    categoria,
    }
    const 
}

 contact: (req, res) => {
        res.render("contacto.ejs");
    },
    contactoProcess: (req,res) => {
        let newProdcut = {
            id = req.body.id,
            name = req.body.name,
            type = req.body.type,           
            img = req.body.img,
            stock = req.body.stock,
            price = req.body.price,
            description = req.body.description,
            alcohol = req.body.alcohol,
            bitterness = req.body.bitterness,
            idealTemperature = req.body.idealTemperature,
            categoria = req.body.categoria,
        
        } 
        dateBase.push(newProduct) // pushamos a el array dataBase la nueva estructura
        fs.writeFileSync(path.join, JSON.stringify(verCONSTANTE DONDE SE GUARDAN TODOS LOS PRODCUTS., null, ' '))
        res.redirect('/')
    } */