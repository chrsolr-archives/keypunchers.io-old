'use strict';

exports.getProfile = (req, res) => {
    const user = req.user;

    if (!user) {
        return res.redirect('/');
    }
    
    return res.render('partials/profile', {user});
};