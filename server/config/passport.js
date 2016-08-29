'use strict';

/**
 * @requires modules:./config
 * @requires modules:passport
 * @requires modules:../modules/data-access/db
 * @requires modules:passport-google-oauth
 * @requires modules:passport-github
 * @requires modules:passport-twitter
 * @requires modules:passport-reddit
 */
const config = require('./config');
const passport = require('passport');
const db = require('../modules/data-access/db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;

/**
 * @function stragetyHandler
 * @desc Handles Passport Strategies For Login/Sign up
 * 
 * @param {object} profile User profile
 * @param {function} done Strategy callbackURL
 * @return {object} Returns user profile
 */
function stragetyHandler(profile, req, done) {
    if (!profile) {
        return done(new Error(`Information returned by ${profile.provider} was empty.`), profile);
    }

    if (req.user) {
        profile._id = req.user._id;
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
        callbackURL: config.apis.google.callbackURL,
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {

        const email = profile.emails.find(value => value.type === 'account').value;

        const user_schema = {
            provider: profile.provider,
            google: {
                id: profile.id,
                displayName: profile.displayName,
                email: email,
                image: profile.photos[0].value,
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                token: accessToken,
                nickname: profile._json.nickname,
                plus_url: profile._json.url
            }
        };

        stragetyHandler(user_schema, req, done);
    }));

    /**
     * @desc Setup GithubStrategy 
     */
    passport.use(new GithubStrategy({
        clientID: config.apis.github.clientID,
        clientSecret: config.apis.github.clientSecret,
        callbackURL: config.apis.github.callbackURL,
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {

        const email = (profile.emails) ? profile.emails[0].value : '';

        const user_schema = {
            provider: profile.provider,
            github: {
                id: profile.id,
                displayName: profile.displayName,
                email: email,
                image: profile.photos[0].value,
                name: profile._json.name,
                token: accessToken,
                username: profile.username,
                profile_url: profile.profileUrl
            }
        };

        stragetyHandler(user_schema, req, done);
    }));

    /**
     * @desc Setup TwitterStrategy 
     */
    passport.use(new TwitterStrategy({
        consumerKey: config.apis.twitter.consumerKey,
        consumerSecret: config.apis.twitter.consumerSecret,
        callbackURL: config.apis.twitter.callbackURL,
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {

        const user_schema = {
            provider: profile.provider,
            twitter: {
                id: profile.id,
                displayName: profile.displayName,
                image: profile.photos[0].value,
                name: profile._json.name,
                token: accessToken,
                username: profile.username,
                profile_url: `www.twitter.com/${profile.username}`,
                screen_name: profile._json.screen_name
            }
        };

        stragetyHandler(user_schema, req, done);
    }));

    /**
     * @desc Setup TwitterStrategy 
     */
    passport.use(new RedditStrategy({
        clientID: config.apis.reddit.clientID,
        clientSecret: config.apis.reddit.clientSecret,
        callbackURL: config.apis.reddit.callbackURL,
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, done) {

        const user_schema = {
            provider: profile.provider,
            reddit: {
                id: profile.id,
                displayName: profile.name,
                name: profile.name,
                token: accessToken,
                username: profile.name,
            }
        };

        stragetyHandler(user_schema, req, done);
    }));

    /**
     * @desc Serialize passport user
     */
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    /**
     * @desc Deserialize passport user
     */
    passport.deserializeUser((user, done) => {
        db.users.getById(user._id).then(res => done(null, res));
    });
};