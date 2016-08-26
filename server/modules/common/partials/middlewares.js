'use strict';

/**
 * @class Middleware
 * @desc Class contains custom Middlewares
 */
class Middleware {
    /**
     * Creates an instance of Middleware.
     */
    constructor() {}

    /**
     * @function isAuthenticated
     * @desc Check if the user is Authenticated
     * before continuing to the route.
     * 
     * @static
     * @param {object} req Route request
     * @param {object} res Route response
     * @param {function} next Callback
     * @returns
     */    
    static isAuthenticated(req, res, next) {
        
        const user = req.user;

        if (!user) {
            return res.redirect('/login');
        }

        return next();
    }

    /**
     * @function isAuthenticatedAndAdmin
     * @desc Check if the user is Authenticated 
     * and is an admin before continuing to the route.
     * 
     * @static
     * @param {object} req Route request
     * @param {object} res Route response
     * @param {function} next Callback
     * @returns
     */    
    static isAuthenticatedAndAdmin(req, res, next) {
        const user = req.user;

        if (!user || !user.isAnAdmin) {
            return res.redirect('/login');
        }

        return next();
    }
}

/**
 * @desc Export
 */
module.exports = Middleware;