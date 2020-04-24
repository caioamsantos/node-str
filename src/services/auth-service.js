'use strict';

const jwt = require('jsonwebtoken');

exports.generate = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decode = async (token) => {
    var data = jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        })
    }
}
exports.isAdmin = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                if(decoded.roles.includes('admin')){
                    next();

                } else{
                    res.status(403).json({
                        message: 'Usuário não possui permissão para executar esta ação'
                    });
                }
            }
        })
    }
}
