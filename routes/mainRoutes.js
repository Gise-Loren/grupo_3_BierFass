const express = require ('express');

const mainController = require ('../controllers/mainControllers');

const router = express.Router();

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img');
    },
    filename: (req, file, callback) => {

        callback(null, "../img/imgBier" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage});

const storageUser = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/users');
    },
    filename: (req, file, callback) => {

        callback(null, "../img/users/imgBier" + Date.now() + path.extname(file.originalname));
    }
})
const uploadUsers = multer({storageUser});


router.get('/', mainController.index);

router.get('/ageDate', mainController.ageDate);

router.get('/home', mainController.home);

router.get('/products', mainController.products);

router.get('/cart', mainController.cart);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

router.post('/register', uploadUsers.any(), mainController.registerProcess);

router.get('/description', mainController.description);

router.get('/formUser', mainController.formUser);

router.post('/formUser', upload.any(), mainController.prodcutsProcess)



module.exports = router;
