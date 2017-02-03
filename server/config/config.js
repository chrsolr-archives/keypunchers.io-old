'use strict';

const config = (() => {
    const CLIENT = './public/';

    const db = {
        URL: process.env.DB_URL || 'mongodb://dummy:dummy@ds161225.mlab.com:61225/kpdb-dev'
    };

    const server = {
        PORT: process.env.PORT || 3000,
        ENV: process.env.NODE_ENV || 'DEV',
        SECRET: process.env.SECRET || 'SECRET',
        BRAND_TITLE: process.env.BRAND_TITLE || 'KeyPunchers.io-DEV'
    };

    const apis = {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || '864354150014-6ks73u7keiedflbpt8roqoatdosf07d4.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'beGjU-IA2tLNV8HKy-4Zr-2W',
            callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
        },
        github: {
            clientID: process.env.GITHUB_CLIENT_ID || '4b2e694149975ebfde17',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '7498b636a3781e079cc9e8fc17241639644cd7c5',
            callbackURL: process.env.GITHUB_CALLBACK || '/auth/github/callback'
        },
        twitter: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY || 'qcrINgXTo1JtDaU5ZOxEFgj9C',
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '2ryd6ZN2WBMCAaYC4hHMKw5HAFuOaPvIoG0TQ9WrHXXRH00yxH',
            callbackURL: process.env.TWITTER_CALLBACK || '/auth/twitter/callback'
        },
        reddit: {
            clientID: process.env.REDDIT_CLIENT_KEY || 'cVYX853F95qJ3Q',
            clientSecret: process.env.REDDIT_CLIENT_SECRET || '9OnQNqFpNSndXx6pOBI_LQoCZWw',
            callbackURL: process.env.REDDIT_CALLBACK || '/auth/reddit/callback'
        }
    };

    const paths = {
        ROOT: '.',
        CLIENT: CLIENT,
        CSS: `${CLIENT}css/`,
        JS: `${CLIENT}js/`,
        VIEWS: `${CLIENT}partials/`,
        TYPESCRIPT: `${CLIENT}typescript/`,
        SASS: `${CLIENT}sass/`,
        LIBS: `${CLIENT}libs/`
    };

    const gulp = {
        ts_config_json: {
            order: [
                `**/typescript/**/*.ts`
            ],
            tsConfig: {
                'compilerOptions': {
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
            ignoreFiles: ['-min.js', '.min.js'],
            mangle: true
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