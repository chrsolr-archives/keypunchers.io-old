'use strict';

const config = require('./config');
const passport = require('passport');
const db = require('../modules/data-access/db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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

        db.users.addGoogleProfile(profile, accessToken)
            .then((res) => done(null, res), (err) => done(err, null));
    }));

    passport.use(new TwitterStrategy({
        consumerKey: config.apis.twitter.consumerKey,
        consumerSecret: config.apis.twitter.consumerSecret,
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    }, function (req, token, tokenSecret, profile, done) {
        if (!profile) { 
            return done('Google authentication failed', profile); 
        }

        db.users.addTwitterProfile(profile, token, tokenSecret)
            .then((res) => done(null, res), (err) => done(err, null));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userId, done) => {
        db.users.getById(userId).then(res => done(null, res));
    });
};