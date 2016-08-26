'use strict';

const model = require('../models/User');

class UserContext {
    constructor() { }

    addGoogleProfile(profile, accessToken) {

        return new Promise((resolve, reject) => {

            const email = profile.emails.find(value => value.type === 'account').value;

            model.findOne({ email: email }, (err, user) => {
                if (user && user.google.id) {
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

            const email = profile.emails.find(value => value.type === 'account').value;

            model.findOne({ email: email }, (err, user) => {
                if (user && user.google.id) {
                    return resolve(user);
                }

                const user_schema = {
                    displayName: profile.displayName,
                    email: profile.emails.find((value) => {
                        return value.type === 'account';
                    }).value,
                    image: profile.photos[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    twitter: {
                        id: profile.id,
                        token: token,
                        secretToken: secretToken
                    }
                };

                return resolve(user);

                // var User = new model(user_schema);
                // User.save((err, user) => {
                //     if (err) {
                //         return reject(err);
                //     }

                //     return resolve(user);
                // });
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