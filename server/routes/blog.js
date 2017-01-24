'use strict';

const blog_controller = require('../controllers/blog.controller');
const common = require('../modules/common/common');

const mountRoutes = (app) => {
    app.get('/blogs', blog_controller.get_blogs);
    app.get('/blogs/create', common.middlewares.isAuthenticatedAndAdmin, blog_controller.create_blog_GET);
    app.post('/blogs/create', common.middlewares.isAuthenticatedAndAdmin, blog_controller.create_blog_POST);
    app.get('/blogs/:permalink', blog_controller.get_blog_by_permalink);
    app.post('/blogs/:permalink', common.middlewares.isAuthenticated, blog_controller.add_blog_comment);
};

exports.mountRoutes = mountRoutes;