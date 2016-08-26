'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {

    const schema = {
        image: { type: String, trim: true },
        email: { type: String, required: true, index: { unique: true }, trim: true },
        email_canonical: { type: String, uppercase: true, required: true, trim: true, index: { unique: true }},
        name: { type: String, trim: true, required: true},
        displayName: { type: String, required: true, trim: true },

        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },

        google: { type: Object },
        twitter: { type: Object },
        facebook: { type: Object },
        github: { type: Object }
    };

    const UserSchema = new mongoose.Schema(schema);

    UserSchema.pre('save', function (next) {
        
        this.email_canonical = this.email;

        next();
    });

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel);