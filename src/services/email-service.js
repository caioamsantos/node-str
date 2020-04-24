'use strict';

const config = require('../config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {

    const message = {
        to: to,
        from: 'caio.amsantos@outlook.com',
        subject: subject,
        html: body
    };
    
    sendgrid.send(message);
}