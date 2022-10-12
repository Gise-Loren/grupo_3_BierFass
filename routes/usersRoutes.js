const express = require ("express");

const router = express.Router();

const usersControllers = require ("../controllers/usersControllers");

const upload = require("../middlewares/multerUser")

router.get('/register', usersControllers.register);

router.post('/register', upload.any(), usersControllers.registerProcess);

router.get('/login', usersControllers.login);
router.post('/login', usersControllers.processLogin);

router.get('/profile', usersControllers.profile);

module.exports = router;