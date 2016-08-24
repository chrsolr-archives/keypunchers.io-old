'use strict';

exports.getIndex = (req, res) => {
    return res.render('partials/index', { title: "KeyPunchers.io", desc: "Under Construction"});
};

exports.getAbout = (req, res) => {
    return res.render('partials/about', { title: "KeyPunchers.io", desc: "Under Construction"});
};