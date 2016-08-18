'use strict';

const homeController = require('../controllers/home.controller');

const mountRoutes = (app) => {
    app.get('/', homeController.getIndex);
};

exports.mountRoutes = mountRoutes;