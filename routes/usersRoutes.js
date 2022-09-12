const express = require ("express");

const router = express.Router();

const usersControllers = require ("../controllers/usersControllers");

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './');
    },
    filename: (req, file, callback) => {

        callback(null, 
            
             "public/img/users/img-users-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

router.get('/register', usersControllers.register);

router.post('/register', upload.any(), usersControllers.registerProcess);

router.get('/login', usersControllers.login);

module.exports = router;