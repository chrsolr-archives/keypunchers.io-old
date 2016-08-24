'use strict';

const model = require('../models/Tag');

const data = (() => {

    function getTags(limit) {
        return model.getTags(limit || 10);
    }

    return {
        getTags
    };
})();

module.exports = data;