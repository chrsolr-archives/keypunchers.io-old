define(["require", "exports", 'jquery'], function (require, exports, $) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            this.setFooterHeight();
        };
        Bootstrapper.prototype.setPageTransition = function () {
            $('a.transition').on('click', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $('.main-wrapper').fadeOut('fast', function () {
                    document.location.href = url;
                });
            });
        };
        Bootstrapper.prototype.setFooterHeight = function () {
            var $footer = $('.footer');
            var $main_wrapper = $('.main-wrapper');
            $main_wrapper.css('margin-bottom', $footer.outerHeight());
            $footer.css({ opacity: 1 });
        };
        return Bootstrapper;
    }());
    exports.Bootstrapper = Bootstrapper;
});
