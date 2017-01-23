'use strict';

const mongoose = require('mongoose');

const CommentModel = (() => {

    const schema = {
        isActive: { type: Boolean, default: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        content: { type: String, required: true }
    };

    const CommentSchema = mongoose.Schema(schema);

    return CommentSchema;
})();

module.exports = mongoose.model('comments', CommentModel);