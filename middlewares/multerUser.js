const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/users/');
    },
    filename: (req, file, callback) => {

        callback(null, 
            
             "img-users-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

module.exports = upload;