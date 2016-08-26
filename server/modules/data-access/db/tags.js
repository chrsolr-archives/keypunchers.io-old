'use strict';

/**
 * @requires module:../models/Tag
 */
const model = require('../models/Tag');

/**
 * @class TagContext
 * @description Class for accessing tags in the database
 */
class TagContext {
    /**
     * Creates an instance of TagContext.
     */
    constructor() { }

    /**
     * @function getAll
     * @description Get all tags from the database
     * 
     * @param {object} query MongoDB Query Object
     * @returns Returns all Tags from the database
     */
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

/**
 * @description Export a new instance of the class.
 */
module.exports = new TagContext();