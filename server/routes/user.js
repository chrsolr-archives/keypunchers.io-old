'use strict';

const userController = require('../controllers/user.controller');

const mountRoutes = (app) => {
    app.get('/profile', userController.getProfile);
};

exports.mountRoutes = mountRoutes;