const fs = require('fs');
const path = require('path');
/* 
const productsJson = path.join(__dirname, '../data/products.json');
const listOfProducts = JSON.parse(fs.readFileSync(productsJson, 'utf8'));
 */

/* const usersJson = path.join(__dirname, '../data/users.json');
const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));
 */


const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => res.render('ageDate'),
    home: (req, res) => res.render('home'),
    cart: (req, res) => res.render('carrito'),
/*     login: (req, res) => res.render('login'), */
   /*  register: (req, res) => res.render('register'),
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
    }, */
    description: (req, res) => res.render('descripcion'),
    formUser: (req, res) =>res.render('formUser')
}
module.exports = controller;