'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 1,
            version_name: '0.0.2',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://forum.xda-developers.com/attachment.php?attachmentid=4141216&d=1494138063'
        });
    });
};

exports.mountRoutes = mountRoutes;