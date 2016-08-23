import * as $ from 'jquery';

export class Bootstrapper {
    constructor() { }

    initialize() {
        this.setFooterHeight();
    }

    setPageTransition() {
        $('a.transition').on('click', function (e: any) {
            e.preventDefault();

            const url = $(this).attr('href');

            $('.main-wrapper').fadeOut('fast', function () {
                document.location.href = url;
            });
        });
    }

    setFooterHeight() {
        const $footer = $('.footer');
        const $main_wrapper = $('.main-wrapper');

        $main_wrapper.css('margin-bottom', $footer.outerHeight());
        $footer.css({opacity: 1});
    }
}