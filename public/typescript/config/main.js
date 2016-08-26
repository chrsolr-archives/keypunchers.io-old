/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper',
        prism: 'libs/prism/prism'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

requirejs(['Bootstrapper', 'jquery', 'bootstrap'], function (Bootstrapper) {
    'use strict';
    new Bootstrapper.Bootstrapper().initialize();
});