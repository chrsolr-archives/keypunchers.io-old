'use strict';

/**
 * Imported modules
 */
const mongoose = require('mongoose');

/**
 * Blog Model
 */
const BlogModel = (() => {

    /**
     * Model schema
     */
    const schema = {
        imageUrl: String,
        title: String,
        permalink: String,
        isActive: { type: Boolean, default: false },
        author: String,
        tags: Array,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        preview: String,
        content: String
    };

    /**
     * Create Schema
     */
    const BlogSchema = mongoose.Schema(schema);

    BlogSchema.methods.toVM = function () {
        var _this = this;

        return {
            title: _this.title,
            author: _this.author,
            imageUrl: _this.imageUrl,
            permalink: _this.permalink,
            preview: _this.preview,
            content: _this.content,
            tags: _this.tags,
            createdAt: _this.createdAt,
            updateAt: _this.updateAt,
            comments: _this.comments
        };
    };

    /**
     * Get list of blogs
     */
    BlogSchema.statics.getBlogs = function (query, limit) {
        const _this = this;
        const _query = query;

        return new Promise((resolve, reject) => {
            var query = _this.find(_query);
            query.sort({ 'createdAt': -1 });
            query.limit(limit || 10);
            query.exec((err, data) => {

                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    };

    /**
     * Get blog by permalink
     */
    BlogSchema.statics.getBlogByPermalink = function (query) {
        const _this = this;
        const _query = query;

        return new Promise((resolve, reject) => {
            var query = _this.findOne(_query);
            query.sort({ 'createdAt': -1 });
            query.exec((err, data) => {

                if (err) {
                    return reject(err);
                }

                return resolve(data.toVM());
            });
        });
    };

    /**
     * Return user schema
     */
    return BlogSchema;
})();

/**
 * Expose
 */
module.exports = mongoose.model('blogs', BlogModel);