'use strict';

/**
 * @requires module:../models/User
 */
const UserModel = require('../models/User');

/**
 * @class UserContext
 * @desc Class for accessing users in the database
 */
class UserContext {
    /**
     * Creates an instance of UserContext.
     */
    constructor() { }

    /**
     * @function login
     * @desc Login user
     * 
     * @param {object} profile User profile
     * @returns Returns user profile
     */
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

    /**
     * @function getById
     * @desc Get user by ID from the database
     * 
     * @param {string} id User id
     * @returns Returns user profile
     */
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

/**
 * @desc Export a new instance of the class.
 */
module.exports = new UserContext();