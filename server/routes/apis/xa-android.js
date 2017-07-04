'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 6,
            version_name: '0.0.7',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://labs.xda-developers.com/store/app/io.keypunchers.xa'
        });
    });
};

exports.mountRoutes = mountRoutes;
