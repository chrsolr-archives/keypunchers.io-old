'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {

    const schema = {
        image: { type: String, trim: true },
        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        displayName: { type: String, required: true, trim: true },
        email: { type: String, required: true, index: { unique: true }, trim: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blogs' }],
        firstName: { type: String },
        lastName: { type: String },
        google: { type: Object },
        twitter: { type: Object },
        facebook: { type: Object },
        github: { type: Object },
    };

    const UserSchema = new mongoose.Schema(schema);

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel);