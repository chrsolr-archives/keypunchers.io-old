'use strict';

exports.getIndex = (req, res) => {
    return res.render('partials/index');
};

exports.getAbout = (req, res) => {
    return res.render('partials/about');
};