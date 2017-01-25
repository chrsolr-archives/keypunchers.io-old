define(["require", "exports", 'jquery', 'simplemde', 'marked', "bootstrap_select", "bootstrap_validator"], function (require, exports, $, SimpleMDE, Marked) {
    "use strict";
    var BlogCreate = (function () {
        function BlogCreate(element_id) {
            var _this = this;
            _this.simplemde = new SimpleMDE({
                element: document.getElementById(element_id),
                previewRender: function (text) { return Marked(text); },
                promptURLs: true,
                autosave: {
                    enable: true,
                    uniqueid: 'simplemde_id',
                    delay: 10000
                }
            });
            $(document).ready(function () {
                $('select').selectpicker();
                $('form').validator().on('submit', function (e) {
                    var is_valid = !e.isDefaultPrevented();
                    if (!is_valid)
                        return;
                    e.preventDefault();
                    _this.save();
                });
            });
        }
        BlogCreate.prototype.save = function () {
            var data = {
                imageUrl: $('[name="image"]').val(),
                title: $('[name="title"]').val(),
                preview: $('[name="preview"]').val(),
                content: this.getText(),
                tags: $('#tag-select').selectpicker('val'),
                type: $('#blog-type').selectpicker('val'),
                isActive: $('#blog-active').selectpicker('val') === "1",
            };
            var new_tags = $('#blog-new-tags').val().split(', ');
            if (new_tags.length && new_tags[0]) {
                data.new_tags = new_tags;
            }
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
    return BlogCreate;
});
