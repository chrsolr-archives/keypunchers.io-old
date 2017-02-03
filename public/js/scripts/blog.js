define(["require", "exports", "jquery", "bootstrap_validator"], function (require, exports, $) {
    "use strict";
    var Blog = (function () {
        function Blog() {
            $(document).ready(function () {
                $('form').validator().on('submit', function (e) {
                    var is_valid = !e.isDefaultPrevented();
                    if (!is_valid)
                        return;
                    $('form').find(':submit').attr('disabled', 'disabled');
                });
            });
        }
        return Blog;
    }());
    return Blog;
});
