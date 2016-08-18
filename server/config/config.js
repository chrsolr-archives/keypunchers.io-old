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
        gulp
    }

})();

module.exports = config;