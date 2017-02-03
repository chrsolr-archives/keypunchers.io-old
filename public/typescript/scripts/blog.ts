/// <amd-dependency path="bootstrap_validator" />
/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';

class Blog {
    constructor() {
        $(document).ready(() => {
            $('form').validator().on('submit', (e: JQueryEventObject) => {
                const is_valid = !e.isDefaultPrevented();

                if (!is_valid) return;

                $('form').find(':submit').attr('disabled','disabled');
            });
        });
    }
}

export = Blog;