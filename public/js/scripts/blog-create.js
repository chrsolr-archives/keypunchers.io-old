define(["require", "exports", 'jquery', 'simplemde', 'marked'], function (require, exports, $, SimpleMDE, Marked) {
    "use strict";
    var BlogCreate = (function () {
        function BlogCreate(element_id) {
            var _this = this;
            _this.simplemde = new SimpleMDE({
                element: document.getElementById(element_id),
                previewRender: function (text) { return Marked(text); },
                promptURLs: true
            });
            $('form').submit(function (e) {
                e.preventDefault();
                _this.save();
            });
        }
        BlogCreate.prototype.save = function () {
            var data = {
                imageUrl: $('[name="image"]').val(),
                title: $('[name="title"]').val(),
                preview: $('[name="preview"]').val(),
                content: this.getText()
            };
            $.ajax({
                url: '/blogs/create',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function () {
                window.location.replace('/blogs');
            });
        };
        BlogCreate.prototype.getText = function () {
            return this.simplemde.value();
        };
        return BlogCreate;
    }());
    exports.BlogCreate = BlogCreate;
});
