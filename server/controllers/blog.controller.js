'use strict';

const db = require('../modules/data-access/db');

exports.getBlogs = (req, res) => {
    const tag = req.query.tag;
    const tags = db.tags.getAll();
    const blogs = (tag) ? db.blogs.getByTag(tag) : db.blogs.getAll();

    Promise.all([blogs, tags])
        .then(values => {
            const data = {
                blogs: values[0],
                tags: values[1]
            };

            return res.render('partials/blogs', data);
        });
};

exports.getBlogByPermalink = (req, res) => {
    const permalink = req.params.permalink;

    db.blogs.getByPermalink(permalink).then((data) => res.render('partials/blog', { blog: data }));
};

exports.createBlog_Post = (req, res) => {
    db.blogs.create(req.body).then((data) => res.redirect('/blogs'));
};

exports.createBlog = (req, res) => {
    return res.render('partials/blog-create');
};