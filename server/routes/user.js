'use strict';

const userController = require('../controllers/user.controller');
const common = require('../modules/common/common');

const mountRoutes = (app) => {
    app.get('/login', userController.login);
    app.get('/logout', userController.logout);
    app.get('/profile', common.middlewares.isAuthenticatedAndAdmin, userController.profile);
};

exports.mountRoutes = mountRoutes;