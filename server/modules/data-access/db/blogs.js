'use strict';

const model = require('../models/Blog');

class BlogContext {
    constructor() { }

    getAll(query) {
        query = query || {};

        return new Promise((resolve, reject) => {
            var _query = model.find(query);
            _query.sort({ 'createdAt': -1 });
            _query.limit(query.limit || 10);
            _query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }

    getByTag(tag) {
        return new Promise((resolve, reject) => {
            var query = model.find();
            query.populate('tags', '-_id');
            query.sort({ 'createdAt': -1 });
            query.lean();
            query.exec((err, data) => {
                if (err) { return reject(err); }

                data = data.filter((obj) => {
                    return obj.tags.find(t => (t.name === tag));
                });

                return resolve(data || []);
            });
        });
    }

    getByPermalink(permalink) {
        return new Promise((resolve, reject) => {
            var query = model.findOne();
            query.where('permalink').equals(permalink);
            query.populate('tags', '-_id');
            query.populate('author', 'name -_id');
            query.sort({ 'createdAt': -1 });
            query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }
}

module.exports = new BlogContext();