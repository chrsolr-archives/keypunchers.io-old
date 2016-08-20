'use strict';

const blogController = require('../controllers/blog.controller');

const mountRoutes = (app) => {
    app.get('/blogs', blogController.getBlogs);
};

exports.mountRoutes = mountRoutes;