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
            const delimiter = `${profile.provider}.id`;

            var query = UserModel.findOne();
            query.where(delimiter).equals(profile[profile.provider].id);
            query.exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                if (user && user[profile.provider]) {
                    return resolve(user);
                }

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
     * @function linkAccount
     * @desc Link user social media accounts
     * 
     * @param {object} profile User profile
     * @returns Returns user profile
     */
    linkAccount(profile) {
        return new Promise((resolve, reject) => {
            const delimiter = `${profile.provider}.id`;

            var query = UserModel.findOne();
            query.where(delimiter).equals(profile[profile.provider].id);
            query.exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                if (!user) {
                    UserModel.findByIdAndUpdate(profile._id,
                        { $set: { [profile.provider]: profile[profile.provider], 'provider': profile.provider } },
                        { upsert: true },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(data);
                        });
                }

                if (user && user._id !== profile._id) {
                    UserModel.findByIdAndUpdate(profile._id,
                        { $set: { [profile.provider]: user[profile.provider], provider: user.provider } })
                        .exec((err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            user.remove();
                            return resolve(data);
                        });
                }
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