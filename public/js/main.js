/* globals requirejs  */

requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/dist/jquery.min',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        Bootstrapper: 'js/modules/bootstrapper.min',
        prism: 'libs/prism/prism.min',
        clipboard: 'libs/clipboard/dist/clipboard.min',
        simplemde: 'libs/simplemde/dist/simplemde.min',
        marked: 'libs/marked/marked.min',
        bootstrap_select: '/libs/bootstrap-select/dist/js/bootstrap-select.min',
        bootstrap_validator: '/libs/bootstrap-validator/dist/validator.min'
    },
    shim: {
        Bootstrapper: { deps: ['jquery', 'bootstrap'] },
        bootstrap: { deps: ['jquery'] },
        bootstrap_select: { deps: ['bootstrap'] },
        bootstrap_validator: { deps: ['bootstrap'] },
        prism: { exports: 'prism', deps: ['clipboard'] }
    }
});

requirejs(['Bootstrapper'], function (Bootstrapper) {
    'use strict';
    new Bootstrapper().initialize();
});