'use strict';

const mongoose = require('mongoose');

const BlogModel = (() => {

    const schema = {
        imageUrl: String,
        title: String,
        permalink: String,
        isActive: { type: Boolean, default: false },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        preview: String,
        content: String
    };

    const BlogSchema = mongoose.Schema(schema);

    return BlogSchema;
})();

module.exports = mongoose.model('blogs', BlogModel);