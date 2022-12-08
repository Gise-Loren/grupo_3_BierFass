const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

const upload = require("../middlewares/multerUser")


const validations = require('../middlewares/validationsMiddleware');

const { throws } = require('assert');

router.get('/register', usersControllers.register);
router.post('register', usersControllers.register);

router.post('/register', upload.single('imagen'), validations.validationRegister, usersControllers.registerProcess);

router.get('/login', usersControllers.login);

router.post('/login', validations.validationLogin, usersControllers.processLogin);

router.get('/profile/:id', usersControllers.profile);

router.put('/:id', validations.validtaionEdit, usersControllers.editProcess);

router.delete('/:id', usersControllers.deleteProcess);

router.get('/logout', usersControllers.logout);

router.get('/users/list', usersControllers.usersList);

router.delete('/users/:id/list', usersControllers.deleteUserList);



module.exports = router;