const express = require ("express");

const router = express.Router();

const usersControllers = require ("../controllers/usersControllers");

const upload = require("../middlewares/multer")

router.get('/register', usersControllers.register);

router.post('/register', upload.any(), usersControllers.registerProcess);

router.get('/login', usersControllers.login);

router.get('/profile', usersControllers.profile);

module.exports = router;