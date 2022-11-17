const path = require('path');
const { body } = require('express-validator');

const validations = {
	validationRegister: [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('imagen').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg','.gif'];
		
		if (!file) {
	
			return true;
		} else {
			
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}) 
],
	validationLogin: [
		body('email').isEmail().withMessage('Completa con un email válido'),
        body('password').isLength({ min: 8 }).withMessage('Tu contraseña es incorrecta'),
	],
	validtaionEdit: [
		body('password').isLength({min: 8}).withMessage('La contraseña es incorrecta')
	]
}

	module.exports = validations;