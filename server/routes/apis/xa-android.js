'use strict';

const mountRoutes = (app) => {
    app.get('/api/android/xa/version', (req, res) => {
        return res.json({
            version_code: 2,
            version_name: '0.0.3',
            xda_thread_url: 'https://forum.xda-developers.com/android/apps-games/app-xa-unofficial-xboxachievements-com-t3600450',
            download_url: 'https://firebasestorage.googleapis.com/v0/b/xa-android.appspot.com/o/xa-android-apks%2Fxa-0.0.3.apk?alt=media&token=f05049ad-783e-48e2-81bc-4a973438c2ed'
        });
    });
};

exports.mountRoutes = mountRoutes;