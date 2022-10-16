const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

const validations = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('img').custom((value, { req }) => {
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

const upload = require("../middlewares/multerUser")
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validationsMiddleware');

router.get('/register', usersControllers.register);

router.post('/register', upload.any(), usersControllers.registerProcess);

router.get('/login', usersControllers.login);
router.post('/login', usersControllers.processLogin);

router.get('/profile', authMiddleware, usersControllers.profile);
/* router.post('/profile', usersControllers.processLogin); */

router.get('/profile', usersControllers.profile);

module.exports = router;