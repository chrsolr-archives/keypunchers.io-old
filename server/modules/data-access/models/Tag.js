'use strict';

const mongoose = require('mongoose');

const TagModel = (() => {

    const schema = {
        name: { type: String, required: true, min: 1, trim: true, unique: true }
    };

    const TagSchema = mongoose.Schema(schema);

    return TagSchema;
})();

module.exports = mongoose.model('tags', TagModel);