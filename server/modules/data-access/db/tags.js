'use strict';

const model = require('../models/Tag');

class TagContext {
    constructor() { }

    getAll(query) {
        query = query || {};

        return new Promise((resolve, reject) => {
            var _query = model.find({}, '-_id');
            _query.limit(query.limit || 10);
            _query.sort({ name: 1 });
            _query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }
}

module.exports = new TagContext();