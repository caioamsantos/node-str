'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

mongoose.connect('mongodb+srv://ca9:ca9@cluster0-5e9bp.mongodb.net/nodestr?retryWrites=true&w=majority', { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const Product = require('./models/product');

const indexRoute = require('../src/routes/index-route');
const productRoute = require('./routes/product-route');

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;