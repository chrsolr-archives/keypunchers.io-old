'use strict';

const db = require('../modules/data-access/db');
const marked = require('marked');

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

    db.blogs.getByPermalink(permalink).then((data) => {
        if (data.type && data.type === 'Markdown') {
            data.content = marked(data.content);
        }

        return res.render('partials/blog', { blog: data });
    });
};

exports.createBlog_Post = (req, res) => {
    const blog = req.body;
    blog.author = req.user._id;

    if (blog.new_tags) {
        db.tags.addTags(blog.new_tags).then((data) => {
            delete blog.new_tags;
            blog.tags = blog.tags.concat(data);
            
            db.blogs.create(blog).then(() => res.redirect('/blogs'));
        });
    } else {
        db.blogs.create(blog).then(() => res.redirect('/blogs'));
    }
};

exports.createBlog = (req, res) => {
    db.tags.getAll().then((tags) => res.render('partials/blog-create', { tags }));
};