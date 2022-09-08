const fs = require ("fs")

const path = require('path');

const productsJson = path.join(__dirname, '../data/products.json');

const listOfProducts = JSON.parse(fs.readFileSync(productsJson, 'utf8'));

const productsControllers = {
    index: (req,res) => {
    res.render('productos', {listOfProducts})
    },
    
    
}