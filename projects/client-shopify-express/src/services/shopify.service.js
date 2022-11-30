
const User = require('../models/user');

exports.getUser = user_id => {
    return User.findById(user_id);
};