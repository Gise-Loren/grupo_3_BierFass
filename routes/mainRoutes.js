const express = require('express');

const mainController = require('../controllers/mainControllers');

const router = express.Router();

const multer = require('multer');

const path = require('path');

router.get('/', mainController.index);

router.get('/ageDate', mainController.ageDate);

router.post('/ageDate', mainController.processAgeDate)

router.get('/home', mainController.home);

router.get('/cart', mainController.cart);

router.get('/redirectMinors', mainController.redirectMinors)


/*  router.get('/login', mainController.login); 

router.get('/register', mainController.register);

router.post('/register', uploadUsers.any(), mainController.registerProcess);

router.get('/description', mainController.description); 
  */

module.exports = router;
