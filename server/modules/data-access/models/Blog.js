'use strict';

const mongoose = require('mongoose');

const BlogModel = (() => {

    const schema = {
        imageUrl: { type: String, required: true },
        title: { type: String, required: true },
        permalink: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        preview: { type: String, required: true },
        content: { type: String, required: true },
        type: { type: String, required: true }
    };

    const BlogSchema = mongoose.Schema(schema);

    return BlogSchema;
})();

module.exports = mongoose.model('blogs', BlogModel);