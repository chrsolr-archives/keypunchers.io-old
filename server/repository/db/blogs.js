'use strict';

const model = require('../../models/Blog');

const data = (() => {

    function getBlogs(limit) {
        return model.getBlogs({ isActive: true });
    }

    return {
        getBlogs
    }
})();

module.exports = data;