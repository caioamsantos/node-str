'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        require: true,
        enum: ['user', 'admin'],
        default: ['user']
    }]
});

module.exports = mongoose.model('Customer', schema);