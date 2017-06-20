'use strict';

const common = require('../modules/common/common');

const mountRoutes = (app) => {
    app.get('/portfolio', (req, res) => {
        return res.render('partials/portfolio');
    });
};

exports.mountRoutes = mountRoutes;