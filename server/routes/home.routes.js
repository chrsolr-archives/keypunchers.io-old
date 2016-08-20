'use strict';

const homeController = require('../controllers/home.controller');

const mountRoutes = (app) => {
    app.get('/', homeController.getIndex);
    app.get('/about', homeController.getAbout);
};

exports.mountRoutes = mountRoutes;