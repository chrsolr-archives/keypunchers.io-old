'use strict';

const model = require('../models/Tag');

const data = (() => {

    function getTags(limit) {
        var query = {};
        query.limit = limit || 10;

        return model.getTags(query);
    }

    return {
        getTags
    };
})();

module.exports = data;