import * as $ from 'jquery';

export class Bootstrapper {
    constructor() { }

    initialize() {
        this.setHideNavbar();
        this.setFooterHeight();
    }

    setHideNavbar() {
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
            } else {
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

        }, 250);
    }

    setFooterHeight() {
        const $footer = $('.footer');
        const $main_wrapper = $('.main-wrapper');

        $main_wrapper.css('margin-bottom', $footer.outerHeight());
        $footer.css({ opacity: 1 });
    }
}