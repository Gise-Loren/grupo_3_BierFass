const fs = require('fs');

const path = require('path');

const usersJson = path.join(__dirname, '../data/users.json');

const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const bcrypt = require('bcryptjs');

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
        res.redirect('/products');
    },
    login: (req, res) => {
        
        res.render('login');
    },
    processLogin: (req, res) => {
        const userData = req.body;
        const selectedUser = listOFUsers.find(user => user.email == userData.email)
        if (selectedUser) {
            const isCorrect = (bcrypt.compareSync(userData.password, selectedUser.password))
            if (isCorrect) {
                res.redirect ('/profile'); // crear view profile
            } else {
                res.send('La contraseña es incorrecta!');
            }

        } else {
            res.send('El usuario no existe!');
        }
    }
}


module.exports = usersControllers;

