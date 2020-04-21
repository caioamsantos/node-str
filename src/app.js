'use strict';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const indexRoute = require('../src/routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;