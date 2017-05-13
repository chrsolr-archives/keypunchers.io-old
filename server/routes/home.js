'use strict';

const homeController = require('../controllers/home.controller');

const mountRoutes = (app) => {
    app.get('/', homeController.getIndex);
    app.get('/about', homeController.getAbout);
    app.get('/xa/tos', homeController.getXaTOS);
};

exports.mountRoutes = mountRoutes;