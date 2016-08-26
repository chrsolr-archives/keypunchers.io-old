'use strict';

const config = (() => {
    const CLIENT = './public/';

    const db = {
        URL: process.env.DB_URL || 'mongodb://admin:password@ds161225.mlab.com:61225/kpdb-dev'
    };

    const server = {
        PORT: process.env.PORT || 3000,
        ENV: process.env.NODE_ENV || 'DEV',
        SECRET: process.env.SECRET || 'K3yPunch3r5'
    };

    const apis = {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || '720674278160-lq7ncnm0uqfegd5eft6v11qltrjov1oh.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'bzQg41JGPAPbGREz63du2feu',
            callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
        },
        github: {
            clientID: process.env.GOOGLE_CLIENT_ID || '8ff53b97b4d8b012128f',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '7ad2eb3d456dcec90cdc6b497e85e896115a5414',
            callbackURL: process.env.GOOGLE_CALLBACK || '/auth/github/callback'
        },
        twitter: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY || 'vV8pkzFaiwe9N4fFFMUF1C3o0',
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'mIhRHS5VCYFi1JO9kEDjZnbJrKiLjhObTcVlRnkqw1VBFp2ZZH',
            callbackURL: process.env.TWITTER_CALLBACK || '/auth/twitter/callback'
        }
    };

    const paths = {
        ROOT: '.',
        CLIENT: CLIENT,
        CSS: `${CLIENT}css/`,
        JS: `${CLIENT}js/`,
        VIEWS: `${CLIENT}partials/`,
        TYPESCRIPT: `${CLIENT}typescript/`
    };

    const gulp = {
        ts_config_json: {
            order: [
                `**/typescript/**/*.ts`
            ],
            tsConfig: {
                "compilerOptions": {
                    module: 'amd',
                    target: 'es5',
                    removeComments: true,
                    noImplicitAny: true,
                    sourceMap: true,
                    noImplicitReturns: true,
                    suppressImplicitAnyIndexErrors: true,
                    noFallthroughCasesInSwitch: true,
                    allowUnreachableCode: false,
                    outDir: `${paths.JS}`,
                    declaration: true
                }
            }
        },
        minify_opts: {
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js', '.min.js']
        },
        nodemon_opts: {
            script: 'server.js',
            ext: 'js html less ts',
            delayTime: 3
        },
        css_nano_opts: {
            convertValues: false,
            discardComments: { removeAll: true },
            autoprefixer: false
        }
    };

    return {
        db,
        server,
        paths,
        gulp,
        apis
    };

})();

module.exports = config;