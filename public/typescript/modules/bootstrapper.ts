import * as $ from 'jquery';

export class Bootstrapper {
    constructor() { }

    initialize() {
        this.setPageTransition();
    }

    setPageTransition() {
        $('a').on('click', function (e: any) {
            e.preventDefault();

            const url = $(this).attr('href');

            $('.main-wrapper').fadeOut('fast', function () {
                document.location.href = url;
            });
        });
    }
}