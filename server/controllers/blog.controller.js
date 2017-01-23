'use strict';

const db = require('../modules/data-access/db');
const marked = require('marked');

exports.get_blogs = (req, res) => {
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

exports.get_blog_by_permalink = (req, res) => {
    const permalink = req.params.permalink;

    db.blogs.getByPermalink(permalink).then((data) => {
        if (data.type && data.type === 'Markdown') {
            data.content = marked(data.content);
        }

        const blog = {
            content: data.content,
            imageUrl: data.imageUrl,
            title: data.title,
            createdAt: data.createdAt,
            tags: data.tags,
            permalink: data.permalink,
            author: data.author[data.author.provider].name,
            comments: (!data.comments) ? [] : data.comments.map(value => {
                return { author: value.author[value.author.provider].name, content: value.content, createdAt: value.createdAt };
            })
        };

        return res.render('partials/blog', { blog: blog });
    });
};

exports.create_blog_POST = (req, res) => {
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

exports.create_blog_GET = (req, res) => {
    db.tags.getAll().then((tags) => res.render('partials/blog-create', { tags }));
};

exports.add_blog_comment = (req, res) => {
    const comment = req.body;
    comment.author = req.user._id;

    db.blogs.addComment(comment).then((blog) => {
        return res.redirect(`/blogs/${blog.permalink}`);
    });
};