'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const router = express.Router();
const path = require('path');

process.env.NODE_ENV = config.server.ENV;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.server.SECRET, saveUninitialized: true, resave: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.locals.moment = require('moment');

require('../routes/home.routes').mountRoutes(app);
require('../routes/blog.routes').mountRoutes(app);

module.exports = app;