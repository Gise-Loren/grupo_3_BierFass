const { request } = require("http");

const db = require('../database/models')

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.email;
    let user = req.cookies
    /* if(emailInCookie !=undefined){
        return res.redirect('/')
    }
    let  user = db.User.findOne({
        where: { email: emailInCookie },
        raw: true
    }); */

    if (user) {
        req.session.userLogged = user
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next();
}

module.exports = userLoggedMiddleware;