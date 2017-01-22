/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        'jquery-private': 'js/scripts/jquery-private',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper',
        prism: 'libs/prism/prism',
        simplemde: 'libs/simplemde/dist/simplemde.min',
        marked: 'libs/marked/marked.min',
        bootstrap_select: '/libs/bootstrap-select/dist/js/bootstrap-select.min',
        bootstrap_validator: '/libs/bootstrap-validator/dist/validator.min'
    },
    shim: {
        bootstrap: { deps: ['jquery'] },
        bootstrap_select: { deps: ['bootstrap'] },
        bootstrap_validator: { deps: ['bootstrap'] },
        prism: { exports: 'prism' }
    },
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    'use strict';
    new Bootstrapper.Bootstrapper().initialize();
});