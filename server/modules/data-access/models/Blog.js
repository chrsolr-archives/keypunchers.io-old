'use strict';

const mongoose = require('mongoose');

const BlogModel = (() => {

    const schema = {
        imageUrl: String,
        title: String,
        permalink: String,
        isActive: { type: Boolean, default: false },
        author: String,
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        preview: String,
        content: String
    };

    const BlogSchema = mongoose.Schema(schema);

    return BlogSchema;
})();

module.exports = mongoose.model('blogs', BlogModel);