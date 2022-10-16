const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

const upload = require("../middlewares/multerUser")
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validationsMiddleware');

router.get('/register', guestMiddleware, usersControllers.register);
router.post('/register', upload.any(), validations, usersControllers.registerProcess);

router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.processLogin);

router.get('/profile', authMiddleware, usersControllers.profile);
/* router.post('/profile', usersControllers.processLogin); */

// Logout
/* router.get('/logout', usersController.logout); */

module.exports = router;