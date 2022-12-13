const express = require('express');

const productsApiControllers = require('../../controllers/api/productsApiControllers');

const router = express.Router();

router.get('/', productsApiControllers.list);

router.get('/:id', productsApiControllers.productId);

module.exports = router;