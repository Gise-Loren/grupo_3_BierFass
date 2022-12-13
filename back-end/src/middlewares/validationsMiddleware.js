const path = require('path');
const { body } = require('express-validator');

const validations = {
	validationRegister: [ // <-------- Validaciones de Registro.
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


	validationLogin: [ // <-------- Validaciones de Login.
		body('email').isEmail().withMessage('Completa con un email válido'),
		body('password').isLength({ min: 8 }).withMessage('Tu contraseña es incorrecta'),
	],
	validtaionEdit: [ // <-------- Validacion de edicion de usuario.
		body('password').isLength({ min: 8 }).withMessage('La contraseña es incorrecta')
	], 
	validationProduct: [ // <-------- Validaciones de productos.
		body("name")
        .notEmpty().withMessage("Tienes que escribir un nombre").bail()
        .isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),

		/* body('type_Id')
		.notEmpty().withMessage("Tiene que elegir una opcion").bail(), 
	 */
		body("stock")
		.notEmpty().withMessage("Tienes que ingresar el stock").bail(),
		
		body("price")
		.notEmpty().withMessage("Tienes que ingresar el precio").bail(),

		body("description")
		.notEmpty().withMessage("Tienes que ingresar datos").bail()
		.isLength({min: 20}).withMessage("La descripción debe contener al menos 20 caracteres"),

		body("alcohol")
		.notEmpty().withMessage("Tienes que ingresar el % de alcohol").bail(),
	
		body("bitterness")
		.notEmpty().withMessage("Tienes que ingresar el amargor").bail(),

		body("idealTemperature")
		.notEmpty().withMessage("Tienes que ingresar la temperatura ideal").bail(),

		/* body("category_id")
		.notEmpty().withMessage("Tiene que elegir una opcion").bail(), */
		body('img').custom((value, { req }) => {
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
	 }),
	 body('description')
	 .custom((value, {req}) => {
		
		if(value == "Escribe la descripción..."){
			throw new Error('Debes modificar la descripción')
		} 
			
	 })
	 .isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres')

	]
}

module.exports = validations;