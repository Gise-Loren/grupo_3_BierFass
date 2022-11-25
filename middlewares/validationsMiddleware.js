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
		body('password').isLength({ min: 8 }).withMessage('La contraseña es incorrecta')
	], 
	validationProduct: [
		body("name")
        .notEmpty().withMessage("Tienes que escribir un nombre").bail()
        .isLength({ min: 5 }).withMessage("El nombre debe contener al menos 3 caracteres"),
		body('type_Id')
		.notEmpty().withMessage("Tiene que elegir una opcion").bail(),
		body("stock")
		.custom((value, { req }) => {

            if (value === undefined) {
              throw new Error("Tienes que ingresar el stock");
            }
            return true;
        }),
		body("price")
		.custom((value, { req }) => {

            if (value === undefined) {
              throw new Error("Tienes que ingresar el precio");
            }
            return true;
        }),
		body("description")
        .isLength({min: 20}).withMessage("La descripción debe contener al menos 20 caracteres"),
		body("alcohol")
		.custom((value, { req }) => {

            if (value === undefined) {
              throw new Error("Tienes que ingresar el % de alcohol");
            }
            return true;
        }),
		body("bitterness")
		.custom((value, { req }) => {

            if (value === undefined) {
              throw new Error("Tienes que ingresar el amargor");
            }
            return true;
        }),
		body("idealTemperature")
		.custom((value, { req }) => {

            if (value === undefined) {
              throw new Error("Tienes que ingresar la temperatura ideal");
            }
            return true;
        }),
		body("category_id")
		.notEmpty().withMessage("Tiene que elegir una opcion").bail(),


	]
}

module.exports = validations;