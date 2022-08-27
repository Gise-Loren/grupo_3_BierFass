const express = require ('express');

const mainController = require ('../controllers/mainControllers');

const router = express.Router();

router.get('/', mainController.index);

router.get('/ageDate', mainController.ageDate);

router.get('/home', mainController.home);

router.get('/products', mainController.products);

router.get('/cart', mainController.cart);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

router.get('/description', mainController.description);



module.exports = router;
