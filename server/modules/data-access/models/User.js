'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {

    const schema = {
        provider: { type: String, required: true },

        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },

        google: { type: Object },
        twitter: { type: Object },
        facebook: { type: Object },
        github: { type: Object },
        reddit: { type: Object }
    };

    const UserSchema = new mongoose.Schema(schema);

    UserSchema.pre('save', function (next) {

        this.name_canonical = this.name;

        return next();
    });

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel);