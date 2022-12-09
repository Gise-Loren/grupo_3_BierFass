const db = require('../../database/models');

const usersApiControllers = {
    list: async (req, res) => {
        try {
            let users = await db.User.findAll();
            let count = users.length
            let roleAdmin = users.filter(item => item.category == "Admin");
            let roleUser = users.filter(item => item.category == "User");
            let countByRoleAdmin = roleAdmin.length;
            let countByRoleUser = roleUser.length;
            users.forEach(element => {
                element.dataValues.datail = `/api/users/${element.dataValues.id}`,
                delete element.dataValues.password,
                delete element.dataValues.imagen
            });

            return res.json({
                code: 200,
                msg: "success",
                count,
                countByRoleAdmin,
                countByRoleUser,
                users
            })
        }
        catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }

    },
    userId: async (req, res) => {
        try {
            let user = await db.User.findByPk(req.params.id);
            user.dataValues.img = `/img/users/${user.dataValues.imagen}`
            delete user.dataValues.password,
            delete user.dataValues.imagen


            return res.json({ 
                code: 200,
                msg: "success",
                data: user
             })
        }
        catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },

}

module.exports = usersApiControllers;