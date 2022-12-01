const User = require('../models/user');
const Cryptr = require('cryptr');

exports.getUser = private_key => {
    return User.findOne({'private_key':private_key});
};

exports.decrypt = async (crypted_text) => {
    const cryptr = new Cryptr(process.env.TOKEN_SECRET_KEY);
    return await cryptr.decrypt(crypted_text);
}