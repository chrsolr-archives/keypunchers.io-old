define(["require", "exports", "jquery", "bootstrap_autohide_navbar"], function (require, exports, $) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            this.setHideNavbar();
            this.setFooterHeight();
        };
        Bootstrapper.prototype.setHideNavbar = function () {
            $('.navbar').BootstrapAutoHideNavbar();
        };
        Bootstrapper.prototype.setFooterHeight = function () {
            var $footer = $('.footer');
            var $main_wrapper = $('.main-wrapper');
            $main_wrapper.css('margin-bottom', $footer.outerHeight());
            $footer.css({ opacity: 1 });
        };
        return Bootstrapper;
    }());
    return Bootstrapper;
});
