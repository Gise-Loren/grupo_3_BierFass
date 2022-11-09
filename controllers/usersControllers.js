const fs = require('fs');

const path = require('path');

const usersJson = path.join(__dirname, '../data/users.json');
console.log
const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const bcryptjs = require('bcryptjs');

const { uuid } = require('uuidv4');

const User = require('../models/User');

const {validationResult} = require('express-validator');

const db = require("../src/database/models");

const { Op } = require("sequelize");
const { devNull } = require('os');
const { log } = require('console');

const sequelize = db.sequelize


const usersControllers = {
    register: (req, res) => res.render('register'),

    registerProcess: async (req, res) => {
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = await db.User.findOne({
            where: {
                email: { [Op.like]: req.body.email}
            }
        });
        if(!resultValidation.errors.lenght && !userInDB){
            let wordAdmin = 'bierfass';
            let registeredEmail = req.body.email;
            let isAdmin = registeredEmail.includes(wordAdmin) ? 'Admin' : 'User';
            let img = req.files.map(file => file.filename);
            let filename = '';
            if (img.lenght === 1){
                filename = img[0]
            } else {
                filename = 'img-user-default.png'
            } 
            db.User.create({
                id: uuid(),
                name: req.body.name,
                lastname: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                category: isAdmin,
                imagen: filename
                
            }).then((user) =>{
                req.session.userLogged = user;
                res.redirect("/login");
            });
        } else {
            if(userInDB){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
        } else {
            return res.render("/register",{
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        }
    },
    login: (req, res) => {
        res.render('login');
    },
    processLogin: async (req, res) => {
        let resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let userToLogin = await db.User.findOne({
            where: {
                email: { [Op.like]: req.body.email}
            }
            
        });

        if(userToLogin){
            let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
           
            if (comparePassword == true) {
                delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if(req.body.remember_user) {
                        res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                
                    let id = userToLogin.id
               return  res.redirect('/profile/'+ id);
            }  
 
        } 
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });   
    }
    ,
    profile: (req, res) => {
        console.log(req.session.userLogged)
        return res.render('profile', { user: req.session.userLogged });
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },
    editProcess: (req, res) => {
       let userId = req.params.id
    
        db.User.update({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            category,
            imagen,
           }, {
            where: {
                id: userId
            }
           })
           .then((user) => {
                res.redirect('/');
           })
           .catch ((e) => {
            res.send('ERROR!')
           })
    },
    deleteProcess: (req, res) => {
            let userID = req.session.userLogged.id;
            db.User
            .destroy({where: {id: userID}, force: true}) 
            .then(()=>{
                return res.redirect('/products')})
            .catch(error => res.send(error)) 
    }

}


module.exports = usersControllers;

