const express = require('express');

const productsApiControllers = require('../../controllers/api/productsApiControllers');

const router = express.Router();

router.get('/', productsApiControllers.list);

router.get('/categoriesList', productsApiControllers.productsByCategory);

router.get('/categoriesList/artesanal', productsApiControllers.artesanal);

router.get('/categoriesList/industrial', productsApiControllers.industrial);

router.get('/lastProduct', productsApiControllers.lastProduct);

router.get('/:id', productsApiControllers.productId);

module.exports = router;