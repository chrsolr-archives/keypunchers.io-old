'use strict';

const mongoose = require('mongoose');

const TagModel = (() => {

    const schema = {
        name: { type: String, required: true, min: 1, trim: true }
    };

    const TagSchema = mongoose.Schema(schema);

    TagSchema.statics.getTags = function (query) {
        const _this = this;
        const _query = query;

        return new Promise((resolve, reject) => {
            var query = _this.find(_query);
            query.exec((err, data) => {

                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    };

    return TagSchema;
})();

module.exports = mongoose.model('tags', TagModel);