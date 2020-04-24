'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');

const controller = require('../controllers/product-controller');

router.get('/', authService.authorize, controller.get);
router.get('/:slug', authService.authorize, controller.getBySlug);
router.get('/admin/:id', authService.authorize, controller.getById);
router.get('/tags/:tag', authService.authorize, controller.getByTag);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;