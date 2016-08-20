'use strict';

const model = require('../../models/Blog');

const data = (() => {

    function getBlogs(limit) {
        return model.getBlogs({ isActive: true });
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