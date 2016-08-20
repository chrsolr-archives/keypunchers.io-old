'use strict';

const db = require('../repository/repository');

exports.getBlogs = (req, res, next) => {

    db.blogs.getBlogs().then((data) => {
        return res.render('partials/blogs', { blogs: data });
    });
};

exports.getBlog = (req, res, next) => {
    const permalink = req.params.permalink;

    db.blogs.getBlog(permalink).then((data) => {
        return res.render('partials/blog', { blog: data });
    });
};