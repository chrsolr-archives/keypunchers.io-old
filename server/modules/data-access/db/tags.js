'use strict';

/**
 * @requires module:../models/Tag
 */
const TagModel = require('../models/Tag');

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
     * @desc Get all tags from the database
     * 
     * @param {object} query MongoDB Query Object
     * @returns Returns all Tags from the database
     */
    getAll(query) {
        query = query || {};

        return new Promise((resolve, reject) => {
            var _query = TagModel.find({});
            _query.limit(query.limit || 10);
            _query.sort({ name: 1 });
            _query.lean();
            _query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }

    /**
     * @function addTags
     * @desc Add new tags to database
     * 
     * @param Array tags Array of new tags
     * @returns Returns Prosime
     */
    addTags(tags) {
        if (typeof tags === 'string' || tags instanceof String) {
            tags = [tags];
        }

        return new Promise((resolve, reject) => {
            var _query = TagModel.find({});
            _query.where('name');
            _query.in(tags);
            _query.exec((err, old_tags) => {
                if (err) { return reject(err); }

                tags.forEach((value) => {
                    old_tags.forEach((obj) => {
                        if (value === obj.name) {
                            tags.splice(tags.indexOf(value), 1);
                        }
                    });
                });

                tags = tags.map((value) => {
                    return { name: value };
                });

                TagModel.insertMany(tags, (err, docs) => {
                    if (err) { return reject(err); }

                    const new_tag_ids = docs.map((obj) => obj._id);
                    
                    return resolve(new_tag_ids);
                });
            });
        });
    }
}

/**
 * @desc Export a new instance of the class.
 */
module.exports = new TagContext();