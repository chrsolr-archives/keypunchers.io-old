'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 2,
            version_name: '0.0.3',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://firebasestorage.googleapis.com/v0/b/xa-android.appspot.com/o/xa-android-apks%2FXA-0.0.2.apk?alt=media&token=d8447b4e-68ae-48fd-b70a-50c554b8db76'
        });
    });
};

exports.mountRoutes = mountRoutes;