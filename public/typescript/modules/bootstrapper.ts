/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="navstrap" />

import * as $ from 'jquery';

class Bootstrapper {
    constructor() { }

    initialize() {
        this.setHideNavbar();
        this.setFooterHeight();
    }

    setHideNavbar() {
        $('.navbar').NavStrap().ShowOrHideOnScroll();
    }

    setFooterHeight() {
        const $footer = $('.footer');
        const $main_wrapper = $('.main-wrapper');

        $main_wrapper.css('margin-bottom', $footer.outerHeight());
        $footer.css({ opacity: 1 });
    }
}

export = Bootstrapper;