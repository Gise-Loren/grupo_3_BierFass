const fs = require('fs');
const {	validationResult } = require('express-validator');
const path = require('path');

const usersJson = path.join(__dirname, '../data/users.json');

const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const bcrypt = require('bcryptjs');


const usersControllers = {
    register: (req, res) => res.render('register'),

    validationUser: (req, res) => {
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
    },

    registerProcess: (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let newUser = {
            id: listOFUsers.length + 1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            category: "user",
        }
        if (req.files) {
            newUser.img = req.files.map(file => file.filename)
        }
        listOFUsers.push(newUser);
        fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, ' '));
        res.redirect('profile');
    },
    login: (req, res) => {
        
        res.render('login');
    },
    processLogin: (req, res) => {
        const userData = req.body.email;
        const selectedUser = listOFUsers.find(user => user.email == userData.email)
        if (selectedUser) {
            const isCorrect = (bcrypt.compareSync(userData.password, selectedUser.password))
            if (isCorrect) {
                return res.redirect ('profile'); 
            } else {
                res.send('La contraseña es incorrecta!');
            }

        } else {
            res.send('El usuario no existe!');
        }
    },
    profile: (req, res) => {
        let id = req.params.id;
        let usuario = listOFUsers.find(usuario => usuario.id == id);
        res.render('profile', {usuario});
    },

/* logout: (req, res) => {
    res.clearCookie('email');
    req.session.destroy();
    return res.redirect('/');
} */

}

module.exports = usersControllers;

