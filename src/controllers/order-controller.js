'use strict';

const mongoose = require('mongoose');
const guid = require('guid');
const authService = require('../services/auth-service');
const repository = require('../repositories/order-respository');

const Order = mongoose.model('Order');
const ValidationContract = require('../validators/fluent-validator');

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
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decode(token);

    try {
        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
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
