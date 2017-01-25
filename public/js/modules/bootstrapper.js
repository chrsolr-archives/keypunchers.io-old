define(["require", "exports", 'jquery'], function (require, exports, $) {
    "use strict";
    var Bootstrapper = (function () {
        function Bootstrapper() {
        }
        Bootstrapper.prototype.initialize = function () {
            this.setHideNavbar();
            this.setFooterHeight();
        };
        Bootstrapper.prototype.setHideNavbar = function () {
            var $nav = $('.navbar-default');
            var lastPosition = 0;
            var isScrolled = false;
            var delta = 5;
            var speed = 250;
            $(window).scroll(function () {
                isScrolled = true;
            });
            function onHasScrolled() {
                var top = $(window).scrollTop();
                if (Math.abs(lastPosition - top) <= delta)
                    return;
                if ((top > lastPosition) && (top > $nav.outerHeight())) {
                    $nav.animate({
                        top: '-' + Number($nav.outerHeight() + 10) + 'px'
                    }, speed);
                }
                else {
                    if (top + $(window).height() < $(document).height()) {
                        $nav.animate({
                            top: '0px'
                        }, speed);
                    }
                }
                lastPosition = top;
            }
            setInterval(function () {
                if (isScrolled) {
                    onHasScrolled();
                    isScrolled = false;
                }
            }, speed);
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
