'use strict';

const blogController = require('../controllers/blog.controller');
const common = require('../modules/common/common');

const mountRoutes = (app) => {
    app.get('/blogs', blogController.getBlogs);
    app.get('/blogs/create', common.middlewares.isAuthenticatedAndAdmin, blogController.createBlog);
    app.post('/blogs/create', common.middlewares.isAuthenticatedAndAdmin, blogController.createBlog_Post);
    app.get('/blogs/:permalink', blogController.getBlogByPermalink);
};

exports.mountRoutes = mountRoutes;