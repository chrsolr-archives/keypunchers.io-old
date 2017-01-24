'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport');
const app = express();
const path = require('path');
const helmet = require('helmet');

process.env.NODE_ENV = config.server.ENV;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.server.SECRET, saveUninitialized: false, resave: false }));
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.locals.moment = require('moment');
app.locals.brand_title = config.server.BRAND_TITLE;

passport(app);

app.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
});

require('../routes/home').mountRoutes(app);
require('../routes/blog').mountRoutes(app);
require('../routes/auth').mountRoutes(app);
require('../routes/user').mountRoutes(app);

module.exports = app;