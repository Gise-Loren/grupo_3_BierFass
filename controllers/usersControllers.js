const fs = require('fs');
const path = require('path');
const usersJson = path.join(__dirname, '../data/users.json');
const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));
const bcrypt = require('bcryptjs');
const { body } = require('express-validator')
const {	validationResult} = require('express-validator');

const usersControllers = {
    register: (req, res) => res.render('register'),
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
        res.redirect('product');

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

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/login');
	},

     /* falta terminar validacion - probar si funciona  */

    login: (req, res) => {
        res.render('login');
    },
    processLogin: (req, res) => {
        const userData = req.body.email;
        console.log(userData);
        const selectedUser = listOFUsers.find(user => user.email == userData.email)
        if (selectedUser) {
            const isCorrect = (bcrypt.compareSync(userData.password, selectedUser.password))
            if (isCorrect) {
                return res.redirect('profile');
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
        res.render('profile', { usuario });
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    }

}


module.exports = usersControllers;

