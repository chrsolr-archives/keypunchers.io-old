'use strict';

const getIndex = (req, res, next) => {
    return res.render('partials/index', { title: "KeyPunchers.io", desc: "Under Construction"});
};

exports.getIndex = getIndex;