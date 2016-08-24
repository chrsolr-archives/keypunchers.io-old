'use strict';

const db = require('../repository/repository');

exports.getBlogs = (req, res) => {
    const tag = req.query.tag;
    const tags = [
        "Bootcamp",
        "Bootstrap"
    ];

    db.blogs.getBlogs(tag).then((data) => {
        return res.render('partials/blogs', { blogs: data, tags: tags });
    });
};

exports.getBlog = (req, res) => {
    const permalink = req.params.permalink;

    db.blogs.getBlogByPermalink(permalink).then((data) => {
        return res.render('partials/blog', { blog: data });
    });
};