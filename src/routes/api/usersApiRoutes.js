const express = require('express');

const usersApiControllers = require('../../controllers/api/usersApiControllers');

const router = express.Router();

router.get('/', usersApiControllers.list);

router.get('/:id', usersApiControllers.userId);

module.exports = router;