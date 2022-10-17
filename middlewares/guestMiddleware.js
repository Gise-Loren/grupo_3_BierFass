function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		let id = req.session.userLogged.id
		return res.redirect('/profile/'+ id);
	}
	next();
}

module.exports = guestMiddleware;