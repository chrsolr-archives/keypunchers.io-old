'use strict';

const UserModel = require('../models/User');;

class UserContext {
    constructor() { }

    login(profile) {
        return new Promise((resolve, reject) => {
            var query = UserModel.findOne({ email_canonical: profile.email_canonical });
            query.exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                if (user && user[profile.provider]) {
                    return resolve(user);
                }

                if (user) {
                    user[profile.provider] = profile[profile.provider];
                    user.save();
                    return resolve(user);
                }

                delete profile.provider;

                var User = new UserModel(profile);
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
            UserModel.findOne({ _id: id }).exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }
}

module.exports = new UserContext();