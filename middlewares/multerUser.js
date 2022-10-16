const multer = require('multer'); /* multer permite procesar archivos de imagenes */
const path = require('path');

// Mostrar imagenes en archivos con multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/users');
    },
    filename: (req, file, callback) => {

        callback(null, 
            
             "img-users-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

module.exports = upload;