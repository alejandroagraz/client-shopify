const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

exports.createToken = function(user) {
    const payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(60, "minutes")
    };

    return {
        user_id: user.user_id,
        private_key: user.private_key,
        token_encode: jwt.encode(payload, process.env.TOKEN_SECRET_KEY),
        expiration_date: moment(payload.exp).format('YYYY/MM/DD HH:mm:ss')
    };
};

exports.decodeToken = function(token) {

    const payload = jwt.decode(token, process.env.TOKEN_SECRET_KEY);

    return {
        user_id: payload.sub.user_id,
        private_key: payload.sub.private_key,
        expiration_date: moment(payload.exp).format('YYYY/MM/DD HH:mm:ss')
    };
};