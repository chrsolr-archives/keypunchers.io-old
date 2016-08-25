'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {

    const schema = {
        imageUrl: { type: String, trim: true },
        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        displayName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            index: { unique: true },
            trim: true
        }
    };

    const UserSchema = new mongoose.Schema(schema);

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel);