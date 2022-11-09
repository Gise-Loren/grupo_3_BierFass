const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

const upload = require("../middlewares/multerUser")

const guestMiddleware = require('../middlewares/guestMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');

const validations = require('../middlewares/validationsMiddleware');

const { throws } = require('assert');

router.get('/register', usersControllers.register);

router.post('/register', upload.any(), validations.validationRegister, usersControllers.registerProcess);

router.get('/login', usersControllers.login);

router.post('/login', validations.validationLogin, usersControllers.processLogin);

router.get('/profile/:id', usersControllers.profile);

router.put('profile/:id', usersControllers.editProcess);

router.delete('profile/:id', usersControllers.deleteProcess);

router.get('/logout', usersControllers.logout);


module.exports = router;