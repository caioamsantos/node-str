'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-respository');

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

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter no mínimo 6 caracteres');
    contract.isEmail(req.body.email, 'O email informado é inválido');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const body = req.body;
        await repository.create(body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
    } catch (error) {
        onError(res, error);
    }
};

exports.put = async (req, res, next) => {

    try {
        const id = req.params.id;
        const body = req.body;
        await repository.update(id, body);
        res.status(200).send({ message: 'Cliente atualizado com sucesso' });

    } catch (error) {
        onError(res, error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await repository.delete(id);
        res.status(200).send({ message: 'Client excluído com sucesso' });
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
