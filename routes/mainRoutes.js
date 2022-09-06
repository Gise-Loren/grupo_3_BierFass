const express = require ('express');

const mainController = require ('../controllers/mainControllers');

const router = express.Router();

const multer = require('multer');

const path = require('path');
const { formUser } = require('../controllers/mainControllers');

router.get('/', mainController.index);

router.get('/ageDate', mainController.ageDate);

router.get('/home', mainController.home);

router.get('/products', mainController.products);

router.get('/cart', mainController.cart);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

router.get('/description', mainController.description);

router.get('/formUser', mainController.formUser);

router.post('/formUser', mainController.formUser)


// PARA PODER PROCESAR LAS IMAGENES QUE SE AGREGAN CUANDO AGREGAMOS NUEVOS PRODCUTOS.
/* const storage = multer.diskStorage ( {
    destination: function (req, file, callBack) {
        callBack(null,path.join(__dirname,"../public/img"));
    },
    filname: function (req, file, callBack)   {
         const imageName = "bier-img-" + Date.now() + path.extname(file.originalName);
        callBack(null, imageName);filname 
    }
})
//router.post('/', upload.single("formUser")) */
/* const upload = multer({storage}) */
module.exports = router;
