'use strict';

const db = require('../modules/data-access/db');

exports.getBlogs = (req, res) => {
    const tag = req.query.tag;
    const tags = db.tags.getTags();
    const blogs = db.blogs.getBlogs(tag);

    Promise.all([blogs, tags])
        .then(values => {
            const data = {
                blogs: values[0],
                tags: values[1]
            };
            console.log(data.tags);
            return res.render('partials/blogs', data);
        });
};

exports.getBlog = (req, res) => {
    const permalink = req.params.permalink;

    db.blogs.getBlogByPermalink(permalink).then((data) => {
        return res.render('partials/blog', { blog: data });
    });
};