'use strict';

exports.profile = (req, res) => {
    return res.render('partials/profile');
};

exports.login = (req, res) => {
    return res.render('partials/login');
};

exports.logout = (req, res) => {
    req.logout();
    return res.redirect('/');
};