'use strict';

const model = require('../models/User');

class UserContext {
    constructor() { }

    addGoogleProfile(profile, accessToken) {

        return new Promise((resolve, reject) => {

            const name_canonical = `${profile.name.givenName} ${profile.name.familyName}`.toUpperCase().trim();

            model.findOne({ name_canonical: name_canonical }, (err, user) => {
                if (user && user.google) {
                    return resolve(user);
                }

                if (user) {
                    user.email = user.email || profile.emails.find((value) => {
                        return value.type === 'account';
                    }).value;

                    user.google = {
                        id: profile.id,
                        token: accessToken
                    };

                    user.save();
                    return resolve(user);
                }

                const user_schema = {
                    displayName: profile.displayName,
                    email: profile.emails.find((value) => {
                        return value.type === 'account';
                    }).value,
                    image: profile.photos[0].value,
                    name: `${profile.name.givenName} ${profile.name.familyName}`,
                    name_canonical: `${profile.name.givenName} ${profile.name.familyName}`,
                    google: {
                        id: profile.id,
                        token: accessToken
                    }
                };

                var User = new model(user_schema);
                User.save((err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        });
    }

    addTwitterProfile(profile, token, secretToken) {

        return new Promise((resolve, reject) => {

            const name_canonical = profile._json.name.toUpperCase().trim();

            model.findOne({ name_canonical: name_canonical }, (err, user) => {
                if (user && user.twitter) {
                    return resolve(user);
                }

                 if (user) {
                    user.twitter = {
                        id: profile.id,
                        token: token,
                        secretToken: secretToken
                    };

                    user.save();
                    return resolve(user);
                }

                const user_schema = {
                    displayName: profile.displayName,
                    image: profile.photos[0].value,
                    name: profile._json.name,
                    name_canonical: profile._json.name,
                    twitter: {
                        id: profile.id,
                        token: token,
                        secretToken: secretToken
                    }
                };

                var User = new model(user_schema);
                User.save((err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            model.findOne({ _id: id }).exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }
}

module.exports = new UserContext();