'use strict';

const slug = require('slug');
const BlogModel = require('../models/Blog');
const CommentModel = require('../models/Comment');

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
            var _query = BlogModel.find(query);
            _query.sort({ 'createdAt': -1 });
            _query.limit(query.limit || 10);
            _query.lean();
            _query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }

    /**
     * @function getAll
     * @desc Get all blogs from the database
     * 
     * @param {object} query MongoDB Query Object
     * @returns Returns all blogs from the database
     */
    getAllAdmin() {
        return new Promise((resolve, reject) => {
            var _query = BlogModel.find();
            _query.sort({ 'createdAt': -1 });
            _query.lean();
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
            var query = BlogModel.find();
            query.populate('tags', '-_id');
            query.sort({ 'createdAt': -1 });
            query.lean();
            query.exec((err, data) => {
                if (err) { return reject(err); }

                data = data.filter((obj) => obj.tags.find(t => (t.name_canonical === tag.toLowerCase())));

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
            var query = BlogModel.findOne();
            query.where('permalink').equals(permalink);
            query.populate('tags', '-_id');
            query.populate('author', '-_id');
            query.populate({ path: 'comments', populate: { path: 'author' } });
            query.lean();
            query.sort({ 'createdAt': -1 });
            query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }

    /**
     * @function getById
     * @desc Get blog by id from the database
     * 
     * @param {string} id The ID use to find a specific blog post
     * @returns Returns found blog post from the database
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            var query = BlogModel.findOne();
            query.where('_id').equals(id);
            query.populate('tags');
            query.lean();
            query.exec((err, data) => {
                if (err) { return reject(err); }

                return resolve(data);
            });
        });
    }

    /**
     * @function create
     * @desc Create a Blog Post
     * 
     * @param {} Blog object
     * @returns Returns saved blog post from the database
     */
    create(blog) {
        return new Promise((resolve, reject) => {
            blog.permalink = slug(blog.title, { lower: true });

            const query = BlogModel.findOneAndUpdate({ permalink: blog.permalink }, blog, { 'new': true, upsert: true, setDefaultsOnInsert: true });
            query.lean();
            query.exec((err, doc) => {
                if (err) { return reject(err); }

                return resolve(doc);
            });
        });
    }

    /**
     * @function edit
     * @desc Create a Blog Post
     * 
     * @param {} Blog object
     * @returns Returns saved blog post from the database
     */
    edit(blog) {
        return new Promise((resolve, reject) => {
            const query = BlogModel.findOneAndUpdate({ _id: blog._id }, blog, { 'new': true, upsert: true, setDefaultsOnInsert: true });
            query.lean();
            query.exec((err, doc) => {
                if (err) { return reject(err); }

                return resolve(doc);
            });
        });
    }

    addComment(data) {
        return new Promise((resolve, reject) => {
            if (!data || !data.permalink) { return reject('Not Permalink Provided'); }

            this.getByPermalink(data.permalink).then((blog) => {
                if (!blog) { return reject({ message: 'Blog Post Not found', success: false, code: 404 }); }

                const comment = new CommentModel(data);
                comment.save((err, doc) => {
                    if (err) { return reject(err); }

                    const query = BlogModel.findByIdAndUpdate(blog._id, { $push: { comments: doc } }, { 'new': true });
                    query.lean();
                    query.exec((err, doc) => {
                        if (err) { return reject(err); }

                        return resolve(doc);
                    });
                });
            });
        });
    }
}

/**
 * @desc Export a new instance of the class.
 */
module.exports = new BlogContext();