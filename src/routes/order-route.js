'use strict';

const express = require('express');
const authService = require('../services/auth-service');

const router = express.Router();
const controller = require('../controllers/order-controller');

router.get('/', authService.authorize,controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.post('/', authService.authorize,controller.post);

module.exports = router;