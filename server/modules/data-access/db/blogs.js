'use strict';

const model = require('../models/Blog');

const data = (() => {

    function getBlogs(tag) {
        var query = { isActive: true };

        if (tag) {
            query.tags = { $in: [tag] };
        }

        return model.getBlogs(query);
    }

    function getBlogByPermalink(permalink) {
        return model.getBlogByPermalink({ isActive: true, permalink: permalink });
    }

    return {
        getBlogs,
        getBlogByPermalink
    };
})();

module.exports = data;