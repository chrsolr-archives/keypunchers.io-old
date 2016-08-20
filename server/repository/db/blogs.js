'use strict';

const model = require('../../models/Blog');

const data = (() => {

    function getBlogs(tag) {
        var query = { isActive: true };

        if (tag) 
            query.tags = { $in: [tag] };

        return model.getBlogs(query);
    }

    function getBlog(permalink) {
        return model.getBlog({ isActive: true, permalink: permalink });
    }

    return {
        getBlogs,
        getBlog
    }
})();

module.exports = data;