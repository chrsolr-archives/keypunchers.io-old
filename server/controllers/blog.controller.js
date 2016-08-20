'use strict';

const db = require('../repository/repository');

exports.getBlogs = (req, res, next) => {
    const tag = req.query.tag;
    const tags = [
        "Bootcamp"
    ];

    db.blogs.getBlogs(tag).then((data) => {
        return res.render('partials/blogs', { blogs: data, tags: tags });
    });
};

exports.getBlog = (req, res, next) => {
    const permalink = req.params.permalink;

    db.blogs.getBlog(permalink).then((data) => {
        return res.render('partials/blog', { blog: data });
    });
};