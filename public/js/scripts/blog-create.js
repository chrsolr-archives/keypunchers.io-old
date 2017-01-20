define(["require", "exports", 'jquery', 'simplemde', 'marked'], function (require, exports, $, SimpleMDE, Marked) {
    "use strict";
    var BlogCreate = (function () {
        function BlogCreate(element_id) {
            this.simplemde = new SimpleMDE({
                element: document.getElementById(element_id),
                previewRender: function (text) { return Marked(text); }
            });
        }
        BlogCreate.prototype.save = function (data) {
            data.content = Marked(this.simplemde.value());
            return $.ajax({
                url: '/blogs/create',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            });
        };
        return BlogCreate;
    }());
    exports.BlogCreate = BlogCreate;
});
