'use strict';

/**
 * @requires modules:./config
 * @requires modules:passport
 * @requires modules:../modules/data-access/db
 * @requires modules:passport-google-oauth20
 */
const config = require('./config');
const passport = require('passport');
const db = require('../modules/data-access/db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * @function stragetyHandler
 * @desc Handles Passport Strategies For Login/Sign up
 * 
 * @param {object} profile User profile
 * @param {function} done Strategy callbackURL
 * @return {object} Returns user profile
 */
function stragetyHandler(profile, done) {
    if (!profile) {
        return done(new Error(`Information returned by ${profile.provider} was empty.`), profile);
    }

    db.users.login(profile)
        .then((res) => done(null, res), (err) => done(new Error(err), null));
}

module.exports = (app) => {
    /**
     * @desc Setup passport
     */
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * @desc Setup GoogleStrategy 
     */
    passport.use(new GoogleStrategy({
        clientID: config.apis.google.clientID,
        clientSecret: config.apis.google.clientSecret,
        callbackURL: config.apis.google.callbackURL
    }, function (accessToken, refreshToken, profile, done) {

        const email = profile.emails.find(value => value.type === 'account').value;

        const user_schema = {
            displayName: profile.displayName,
            email: email,
            email_canonical: email.toUpperCase(),
            image: profile.photos[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            provider: 'google',
            google: {
                id: profile.id,
                token: accessToken
            }
        };

        stragetyHandler(user_schema, done);
    }));

    /**
     * @desc Serialize passport user
     */
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    /**
     * @desc Deserialize passport user
     */
    passport.deserializeUser((userId, done) => {
        db.users.getById(userId).then(res => done(null, res));
    });
};