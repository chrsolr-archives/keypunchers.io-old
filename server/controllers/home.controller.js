'use strict';

const getIndex = (req, res, next) => {
    return res.render('partials/index', { title: "KeyPunchers.io", desc: "Under Construction"});
};

/**
 * Expose controller
 */
exports.getIndex = getIndex;