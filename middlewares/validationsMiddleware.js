const path = require('path');
const { check } = require('express-validator');

module.exports = [
	check('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    check('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
	check('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	check('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	check('img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]