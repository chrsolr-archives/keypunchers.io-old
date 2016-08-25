'use strict';

const config = require('./config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../modules/data-access/db');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: config.apis.google.clientID,
        clientSecret: config.apis.google.clientSecret,
        callbackURL: '/auth/google/callback'
    }, function (accessToken, refreshToken, profile, done) {
        if (!profile) { 
            return done('Google authentication failed', profile); 
        }

        db.users.add(profile).then((res) => done(null, res), (err) => done(err, null));
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};