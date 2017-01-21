/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
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
        bootstrap_select: { deps: ['jquery', 'bootstrap'] },
        bootstrap_validator: { deps: ['jquery', 'bootstrap'] },
        prism: { exports: 'prism' }
    }
});

requirejs(['Bootstrapper', 'jquery', 'bootstrap'], function (Bootstrapper) {
    'use strict';
    new Bootstrapper.Bootstrapper().initialize();
});