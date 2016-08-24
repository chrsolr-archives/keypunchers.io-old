'use strict';

const db = require('../modules/data-access/db');

exports.getBlogs = (req, res) => {
    const tag = req.query.tag;
    const tags = [
        "Bootcamp",
        "Bootstrap"
    ];

    db.blogs.getBlogs(tag).then((data) => {

        db.tags.getTags().then(r => {
            console.log(r);
            return res.render('partials/blogs', { blogs: data, tags: tags });
        });

    });
};

exports.getBlog = (req, res) => {
    const permalink = req.params.permalink;

    db.blogs.getBlogByPermalink(permalink).then((data) => {
        return res.render('partials/blog', { blog: data });
    });
};