'use strict';

const express = require('express');
const authService = require('../services/auth-service');

const router = express.Router();

const controller = require('../controllers/customer-controller');

router.post('/', controller.post);
router.post('/auth', controller.auth);
router.post('/refresh-token', authService.authorize , controller.refreshToken);

module.exports = router;