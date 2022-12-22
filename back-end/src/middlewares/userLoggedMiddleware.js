const db = require('../database/models')
const { Op } = require("sequelize");
const sequelize = db.sequelize

function userLoggedMiddleware(req, res, next) {
    db.User.findAll()
    .then(resU => {
       let  user = resU
       let logged = null;
       res.locals.isLogged = false;

   if(req.cookie && req.cookie.email){
       logged = user.call().find(user => user.email === req.cookie.email)
       req.session.userLogged = logged
       res.locals.isLogged = true;
   }

   if(req.session && req.session.userLogged) {
       logged = req.session.userLogged
       res.locals.isLogged = true;
   }

   res.locals.userLogged = logged
   

   return next()
       
   })
}

module.exports = userLoggedMiddleware;