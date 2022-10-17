const fs = require('fs');

const path = require('path');

const usersJson = path.join(__dirname, '../data/users.json');

const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const bcryptjs = require('bcryptjs');

const { uuid } = require('uuidv4');

const User = require('../models/User');

const {validationResult} = require('express-validator');

const usersControllers = {
    register: (req, res) => res.render('register'),

    registerProcess: (req, res) => {
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
            let newUser = {
                id: uuid(),
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                category: "user",
            }
            if (req.files) {
                newUser.img = req.files.map(file => file.filename)
            }
            listOFUsers.push(newUser);
            fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, ' '));

            return res.redirect('/login');
    },
    login: (req, res) => {
        res.render('login');
    },
    processLogin: (req, res) => {
        let resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let userToLogin = User.findByField('email', req.body.email);
        if(userToLogin){
            let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (comparePassword == true) {
                delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    console.log(userToLogin.id)
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
        let id = req.params.id;
        let user = listOFUsers.find(usuario => usuario.id == id);
        res.render('profile', { user });
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },
    editProcess: (req, res) => {
        let id = req.params.id;
        let userEdit = {
            id,
            name: req.body.name,
            lastName: req.body.lastName,           
            email: req.body.email,
            password: req.body.password,
           
        }
        if (req.files) {
            userEdit.img = req.files.map(file=> file.filename)
        }
        userEdit.id = id;

        for (let index = 0; index < listOFUsers.length; index++) {
            const userSelected = listOFUsers[index];
            if (userSelected.id == id) {
                listOFUsers[index] = newProduct;
            }
        }

        fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, 2));

        res.redirect('/');
    },
    deleteProcess: (req, res) => {
        let id = req.params.id;
        for (let index = 0; index < listOFUsers.length; index++) {
            const userSelected = listOFUsers[index];
            if (userSelected.id == id) {
                listOFUsers.splice(index, 1);
            }
        }
        fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, ' '));
        res.redirect('/register');
    }

}


module.exports = usersControllers;

