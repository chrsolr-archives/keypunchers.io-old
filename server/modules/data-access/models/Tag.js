'use strict';

const mongoose = require('mongoose');

const TagModel = (() => {

    const schema = {
        name: { type: String, required: true, min: 1, trim: true }
    };

    const TagSchema = mongoose.Schema(schema);

    TagSchema.statics.getTags = function (limit) {
        const _this = this;

        return new Promise((resolve, reject) => {
            var query = _this.find({}, '-_id');
            query.limit(limit);
            query.sort({ name: 1 });
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