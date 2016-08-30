'use strict';

const passport = require('passport');
const crypto = require('crypto');

const mountRoutes = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), (req, res) => {
        return res.redirect(req.session.return_url || '/');
    });

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/login'
    }), (req, res) => {
        return res.redirect(req.session.return_url || '/');
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), (req, res) => {
        return res.redirect(req.session.return_url || '/');
    });

    app.get('/auth/reddit', function (req, res, next) {
        req.session.state = crypto.randomBytes(32).toString('hex');
        passport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
        })(req, res, next);
    });

    app.get('/auth/reddit/callback', function (req, res, next) {
        if (req.query.state === req.session.state) {
            passport.authenticate('reddit', {
                successRedirect: req.session.return_url || '/',
                failureRedirect: '/login'
            })(req, res, next);
        } else {
            next(new Error(403));
        }
    });
};

exports.mountRoutes = mountRoutes;