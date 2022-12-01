const {decodeToken} = require('../services/token.service');
const moment = require('moment');

module.exports = {
    login: (req, res, next) => {
        if (!req.body.private_key) {
            return res.status(200).send({
                status: 'err',
                message: 'Please enter a private_key.',
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = decodeToken(token);
            if (payload.expiration_date <= moment().format('YYYY/MM/DD HH:mm:ss')) {
                return res.status(200).send({
                    status: 'err',
                    message: 'Your session has expired',
                });
            }
            req.user = payload.sub;
            next();
        } catch (err) {
            console.log(err)
            return res.status(401).send({
                status: 'err',
                message: 'Your session has expired',
            });
        }
    }
};



