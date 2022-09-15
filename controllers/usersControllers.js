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
        const userData = req.body;
        const selectedUser = listOFUsers.find(user=> user.email == userData.email)
        if(selectedUser){
            bcrypt.compareSync(user)
        }else {

        }
        res.render('login')
}
}


module.exports = usersControllers;

 