const fs = require('fs');

const path = require('path');

const bcryptjs = require('bcryptjs');

const { uuid } = require('uuidv4');

const { validationResult } = require('express-validator');

const db = require("../src/database/models");

const { Op } = require("sequelize");

const { devNull } = require('os');


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
                email: { [Op.like]: req.body.email }
            }
        });
        if (!resultValidation.errors.lenght && !userInDB) {
            let wordAdmin = 'bierfass';
            let registeredEmail = req.body.email;
            let isAdmin = registeredEmail.includes(wordAdmin) ? 'Admin' : 'User';
            let img = req.files.map(file => file.filename);
            let filename = '';
            if (img.lenght === 1) {
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

            }).then((user) => {
                res.redirect("/login");
            });
        } else {
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            } else {
                return res.render("/register", {
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
        if (resultValidation.errors.length > 0) {
            return res.render('login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let userToLogin = await db.User.findOne({
            where: {
                email: { [Op.like]: req.body.email }
            }

        });

        if (userToLogin) {
            let comparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (comparePassword == true) {
                delete userToLogin.password;
                res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 * 36 })
                req.session.userLogged = userToLogin;
                if (req.body.remember_user) {
                    res.cookie('email', req.body.email, { maxAge: 1000 * 60 * 60 * 36 });
                }

                let id = userToLogin.id
                return res.redirect('/profile/' + id);
            }

        } else {
            console.log(errors)
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });
        }
    }
    ,
    profile: async (req, res) => {
        let userId = req.params.id
        let userToEdit = await db.User.findByPk(userId, { raw: true })
        return res.render('profile', { user: req.session.userLogged });
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/products');
    },
    editProcess: async (req, res) => {
        let resultValidation = validationResult(req);
        let userId = req.params.id;
        let userToEdit = await db.User.findByPk(userId, { raw: true });
        let wordAdmin = 'bierfass';
        let registeredEmail = req.body.email;
        let imgOld = userToEdit.imagen;
        let isAdmin = registeredEmail.includes(wordAdmin) ? 'Admin' : 'User';
        let comparePassword = bcryptjs.compareSync(req.body.password, userToEdit.password);

        if (resultValidation.errors.length > 0) {

            return res.render('profile', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            if (comparePassword == true) {
                await db.User.update({
                    id: userId,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    category: isAdmin,
                    imagen: imgOld,
                }, {
                    where: {
                        id: userId
                    }
                })
                await db.User.findByPk(userId)
                    .then((user) => {
                        req.session.userLogged = user
                        res.redirect('/profile/' + user.id);
                    })
                    .catch((e) => {
                        res.send('ERROR!')
                    })
            }
        }
    
    },
    deleteProcess: (req, res) => {
        let userID = req.params.id;

        db.User
            .destroy({ where: { id: userID }, force: true })
            .then(() => {
                return res.redirect('/logout')
            })
            .catch(error => res.send(error))
    },

    usersList: async (req, res) => {
        db.User.findAll({
            raw: true
        })
            .then(users => res.render('usersList', { users }));
    }

}


module.exports = usersControllers;

