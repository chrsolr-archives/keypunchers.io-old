'use strict';

const passport = require('passport');

const mountRoutes = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login/'
    }));

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login/'
    }));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login/'
    }));
};

exports.mountRoutes = mountRoutes;