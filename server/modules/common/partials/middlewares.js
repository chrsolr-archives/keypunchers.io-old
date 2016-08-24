'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class Middleware {
    constructor() {}
    
    static isAuthenticated(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            req.session.user = undefined;
            return res.status(500).send({ success: false, message: 'No token provided.' });
        }

        jwt.verify(token, config.server.SECRET, (err, decoded) => {

            if (err) {
                return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
            }

            const profile = {
                avatarUrl: decoded._doc.avatarUrl,
                username: decoded._doc.username,
                firstName: decoded._doc.firstName,
                lastName: decoded._doc.lastName,
                email: decoded._doc.email,
                isAnAdmin: decoded._doc.isAnAdmin
            };

            req.session.user_id = decoded._doc._id;
            req.session.user = profile;

            return next();
        });
    }
}

module.exports = Middleware;