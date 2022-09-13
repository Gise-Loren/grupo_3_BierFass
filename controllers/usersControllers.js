const fs = require('fs');

const path = require('path');

const usersJson = path.join(__dirname, '../data/users.json');

const listOFUsers = JSON.parse(fs.readFileSync(usersJson, 'utf8'));

const usersControllers = {
    register: (req, res) => res.render('register'),
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
            newUser.img = req.files.map(file => file.filename)
        }
        listOFUsers.push(newUser);
        fs.writeFileSync(usersJson, JSON.stringify(listOFUsers, null, ' '));
        res.redirect('/products');
    },
    login: (req, res) => res.render('login'),
}


module.exports = usersControllers;