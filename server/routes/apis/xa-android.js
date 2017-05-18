'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 4,
            version_name: '0.0.5',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://firebasestorage.googleapis.com/v0/b/xa-android.appspot.com/o/xa-android-apks%2Fxa-0.0.5.apk?alt=media&token=24981f8f-21f8-41c8-a8a0-ea794a8ee96b'
        });
    });
};

exports.mountRoutes = mountRoutes;