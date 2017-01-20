define(["require", "exports", 'jquery', 'simplemde', 'marked'], function (require, exports, $, SimpleMDE, Marked) {
    "use strict";
    var BlogCreate = (function () {
        function BlogCreate() {
            this.simplemde = new SimpleMDE({ element: $("#md-editor")[0] });
        }
        BlogCreate.prototype.save = function () {
            console.log('Save Called!!!');
        };
        BlogCreate.prototype.getAsHtml = function () {
            return Marked(this.simplemde.value());
        };
        return BlogCreate;
    }());
    exports.BlogCreate = BlogCreate;
});
