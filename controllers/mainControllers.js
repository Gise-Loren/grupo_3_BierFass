const controller = {
    index: (req,res) => res.render('redirect'),
    ageDate: (req,res) => res.render ('ageDate'),
    home: (req,res) => res.render('home'),
    products: (req,res) => res.render('productos'),
    cart: (req,res) => res.render('carrito'),
    login: (req,res) => res.render('login'),
    register: (req,res) => res.render('register'),
    description: (req,res) => res.render('descripcion'),
    formUser:(req,res)=> res.render('formUser'),
}

module.exports = controller;
