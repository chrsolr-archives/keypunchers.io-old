'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 1,
            version_name: '0.0.2',
            download_url: 'https://www.androidfilehost.com/?fid=529152257862725423'
        });
    });
};

exports.mountRoutes = mountRoutes;