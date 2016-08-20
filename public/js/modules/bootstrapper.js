define(["require", "exports", 'jquery'], function (require, exports, $) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            this.setPageTransition();
        };
        Bootstrapper.prototype.setPageTransition = function () {
            $('a').on('click', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $('.main-wrapper').fadeOut('fast', function () {
                    document.location.href = url;
                });
            });
        };
        return Bootstrapper;
    }());
    exports.Bootstrapper = Bootstrapper;
});
