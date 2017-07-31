'use strict';

const config = require('../config/config');
const db = require('../modules/data-access/db');
const common = require('../modules/common/common');
const marked = require('marked');

const mountRoutes = (app) => {
    app.get('/blogs', (req, res) => {
        const tag = req.query.tag;
        const tags = db.tags.getAll();
        const blogs = (tag) ? db.blogs.getByTag(tag) : db.blogs.getAll();

        Promise.all([blogs, tags])
            .then(values => {
                const data = {
                    blogs: values[0].filter(val => val.isActive),
                    tags: values[1]
                };

                return res.render('partials/blogs', data);
            });
    });

    app.get('/admin/blogs', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        db.blogs.getAllAdmin().then(data => {
            const blogs = data.map(val => {
                return {
                    title: val.title,
                    isActive: val.isActive,
                    id: val._id,
                    permalink: val.permalink
                };
            });

            return res.render('partials/admin-blogs', { blogs });
        });
    });

    app.get('/admin/blog/create', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        db.tags.getAll().then((tags) => res.render('partials/blog-create', {
            tags
        }));
    });

    app.post('/admin/blog/create', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
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
    });

    app.get('/admin/blog/edit/:id', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        const id = req.params.id;
        const tags = db.tags.getAll();
        const blog = db.blogs.getById(id);

        Promise.all([blog, tags])
            .then(values => {
                const data = {
                    blog: values[0],
                    tags: values[1]
                };

                return res.render('partials/blog-edit', data);
            });
    });

    app.post('/admin/blog/edit/:id', common.middlewares.isAuthenticatedAndAdmin, (req, res) => {
        const blog = req.body;
        blog._id = req.params.id;

        if (blog.new_tags) {
            db.tags.addTags(blog.new_tags).then((data) => {
                delete blog.new_tags;
                blog.tags = blog.tags.concat(data);

                db.blogs.edit(blog).then(() => res.redirect('/admin/blogs'));
            });
        } else {
            db.blogs.edit(blog).then(() => res.redirect('/admin/blogs'));
        }
    });

    app.get('/blogs/:permalink', (req, res) => {
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
                    return {
                        author: value.author[value.author.provider].name,
                        avatar: value.author[value.author.provider].image || '/assets/images/default-profile-image.jpg',
                        content: value.content,
                        createdAt: value.createdAt
                    };
                })
            };

            return res.render('partials/blog', {
                blog: blog
            });
        });
    });

    app.post('/blogs/:permalink', common.middlewares.isAuthenticated, (req, res) => {
        const comment = {
            content: req.body.comment_post,
            permalink: req.params.permalink,
            author: req.user._id
        };

        db.blogs.addComment(comment).then((blog) => {
            const sendgrid = require('sendgrid')(config.apis.sendgrid.key);
            const request = sendgrid.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: {
                    personalizations: [
                        {
                            to: [
                                {
                                    email: 'iamrelos@gmail.com'
                                }
                            ],
                            subject: 'Blog Comment Post'
                        }
                    ],
                    from: {
                        email: 'blog@keypunchers.io'
                    },
                    content: [
                        {
                            type: 'text/plain',
                            value: `http://www.keypunchers.io/blogs/${comment.permalink} \n\n\"${comment.content}\"`
                        }
                    ]
                }
            });

            sendgrid.API(request).then(response => res.redirect(`/blogs/${blog.permalink}`)).catch((err) => {
                err.response.body.errors.forEach((error) => console.log(error.message));
                return res.redirect(`/blogs/${blog.permalink}`);
            });
        });
    });
};

exports.mountRoutes = mountRoutes;