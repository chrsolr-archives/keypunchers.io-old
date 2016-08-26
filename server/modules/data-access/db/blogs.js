'use strict';

/**
 * @requires module:../models/Blog
 */
const model = require('../models/Blog');

/**
 * @class BlogContext
 * @desc Class for accessing blogs in the database
 */
class BlogContext {
    /**
     * Creates an instance of BlogContext.
     */
    constructor() { }

    /**
     * @function getAll
     * @desc Get all blogs from the database
     * 
     * @param {object} query MongoDB Query Object
     * @returns Returns all blogs from the database
     */
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

    /**
     * @function getByTag
     * @desc Get all blogs by the tag name from the database
     * 
     * @param {string} tag Tag name to search for
     * @returns Returns all found blogs from the database
     */
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

    /**
     * @function getByPermalink
     * @desc Get blog by permalink from the database
     * 
     * @param {string} permalink The permalink use to find a specific blog post
     * @returns Returns found blog post from the database
     */
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

/**
 * @desc Export a new instance of the class.
 */
module.exports = new BlogContext();