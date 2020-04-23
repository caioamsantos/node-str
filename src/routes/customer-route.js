'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/customer-controller');

router.get('/:id', controller.getById);
router.post('/', controller.post);
router.delete('/:id', controller.delete);

module.exports = router;