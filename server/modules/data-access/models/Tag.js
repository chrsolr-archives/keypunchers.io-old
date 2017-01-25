'use strict';

const mongoose = require('mongoose');

const TagModel = (() => {

    const schema = {
        name: { type: String, required: true, min: 1, trim: true, unique: true },
        name_canonical: { type: String, required: true, trim: true, unique: true, index: true }
    };

    const TagSchema = mongoose.Schema(schema);

    TagSchema.pre('save', function (next) {

        this.name_canonical = this.name;

        return next();
    });

    return TagSchema;
})();

module.exports = mongoose.model('tags', TagModel);