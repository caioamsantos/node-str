'use strict'

const express = require('express');
const authService = require('../services/auth-service');

const router = express.Router();

router.get(
    '/',
    (req, res, next) => {
        res.status(200).send({
            title: 'Node store API',
            version: '0.0.1'
        });
    });

module.exports = router;