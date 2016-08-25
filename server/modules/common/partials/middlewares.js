'use strict';

class Middleware {
    constructor() {}
    
    static isAuthenticated(req, res, next) {
        
        const user = req.user;

        if (!user) {
            return res.redirect('/login');
        }

        return next();
    }

    static isAuthenticatedAndAdmin(req, res, next) {
        const user = req.user;

        if (!user || !user.isAnAdmin) {
            return res.redirect('/login');
        }

        return next();
    }
}

module.exports = Middleware;