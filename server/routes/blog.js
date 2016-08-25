'use strict';

const blogController = require('../controllers/blog.controller');

const mountRoutes = (app) => {
    app.get('/blogs', blogController.getBlogs);
    app.get('/blogs/:permalink', blogController.getBlogByPermalink);
};

exports.mountRoutes = mountRoutes;