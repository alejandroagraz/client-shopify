const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: false,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        private_key: {
            type: String,
            unique: false,
            required: true
        },
        createdAt: {
            type: Date,
            unique: true,
            required: true
        },
        updatedAt: {
            type: Date,
            unique: true,
            required: true
        },
    });

module.exports = mongoose.model('User', UserSchema);