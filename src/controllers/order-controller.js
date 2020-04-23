'use strict';

const mongoose = require('mongoose');
const guid = require('guid');
const Order = mongoose.model('Order');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-respository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        onError(res, error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error) {
        onError(res, error);
    }
}

exports.post = async (req, res, next) => {
    let body = req.body;
    body.number = guid.raw().substring(0,6);

    try {
        await repository.create(body);
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso'
        });
    } catch (error) {
        onError(res, error);
    }
};


function onError(res, error) {
    res.status(500).send({
        message: 'Falha ao processar a requisição',
        data: error
    });
}
