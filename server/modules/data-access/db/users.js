'use strict';

const model = require('../models/User');

class UserContext {
    constructor() { }

    add(profile) {

        return new Promise((resolve, reject) => {
            
            const _user = {
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails.find((value) => {
                    return value.type === 'account';
                }).value,
                imageUrl: profile.photos[0].value
            };

            var User = new model(_user);
            model.find({email: _user.email }, (err, users) => {
                if (users.length) {
                    return resolve(_user);
                }

                User.save((err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        });
    }
}

module.exports = new UserContext();