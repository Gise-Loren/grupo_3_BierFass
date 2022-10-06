const path = require('path');

const multer = require('multer');

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

module.exports = upload;