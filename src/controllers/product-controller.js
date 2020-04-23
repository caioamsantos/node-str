'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-respository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        onError(res, error);

    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const data = await repository.getBySlug(slug);
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

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        onError(res, error);
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O parâmetro title deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O  parâmetro slug deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O parâmetro description deve conter no mínimo 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const body = req.body;
        await repository.create(body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
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
        res.status(200).send({ message: 'Produto atualizado com sucesso' });

    } catch (error) {
        onError(res, error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await repository.delete(id);
        res.status(200).send({ message: 'Produto excluído com sucesso' });
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
