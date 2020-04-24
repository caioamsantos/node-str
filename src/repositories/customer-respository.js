'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.create = async (data) => {
    var customer = new Customer(data);
    
    const res = await customer.save();
    return res;
}

exports.delete = async (id) => {
    const res = await Customer.findOneAndRemove(id);
    return res;
}