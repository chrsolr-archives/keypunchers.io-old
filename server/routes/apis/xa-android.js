'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 3,
            version_name: '0.0.4',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://firebasestorage.googleapis.com/v0/b/xa-android.appspot.com/o/xa-android-apks%2Fxa-0.0.4.apk?alt=media&token=86f97bea-4547-44c9-878d-c5020833253c'
        });
    });
};

exports.mountRoutes = mountRoutes;