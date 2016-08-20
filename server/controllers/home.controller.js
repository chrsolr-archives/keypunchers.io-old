'use strict';

exports.getIndex = (req, res, next) => {
    return res.render('partials/index', { title: "KeyPunchers.io", desc: "Under Construction"});
};

exports.getAbout = (req, res, next) => {
    return res.render('partials/about', { title: "KeyPunchers.io", desc: "Under Construction"});
};