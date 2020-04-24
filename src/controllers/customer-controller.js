'use strict';

const md5 = require('md5');
const mongoose = require('mongoose');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

const Customer = mongoose.model('Customer');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-respository');
const config = require('../config');


exports.auth = async (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        };

        const customer = await repository.authenticate(user);

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos',
            });

            return;
        }
        const token = await authService.generate({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        onError(res, error);
    }

}

exports.refreshToken = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decode(token);

    try {

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado',
            });

            return;
        }

        const tokenData = await authService.generate({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
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
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        };

        await repository.create(user);

        emailService.send(
            user.email,
            'Bem-vindo ao NodeStore',
            global.EMAIL_TMPL.replace('{0}', user.name)
        );

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
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
