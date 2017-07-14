define(["require", "exports", "jquery", "simplemde", "marked", "bootstrap_select", "bootstrap_validator"], function (require, exports, $, SimpleMDE, Marked) {
    "use strict";
    var BlogEdit = (function () {
        function BlogEdit(element_id, blog) {
            this.blog = blog;
            var _this = this;
            _this.simplemde = new SimpleMDE({
                element: document.getElementById(element_id),
                previewRender: function (text) { return Marked(text); },
                promptURLs: true,
                initialValue: _this.blog.content,
                autosave: {
                    enable: true,
                    uniqueid: 'simplemde_id',
                    delay: 10000
                }
            });
            $(document).ready(function () {
                $('select').selectpicker();
                $('#tag-select').selectpicker('val', _this.blog.tags.map(function (tag) { return tag._id; }));
                $('#blog-type').selectpicker('val', _this.blog.type);
                $('#blog-active').selectpicker('val', _this.blog.isActive ? '1' : '0');
                $('form').validator().on('submit', function (e) {
                    var is_valid = !e.isDefaultPrevented();
                    if (!is_valid)
                        return;
                    e.preventDefault();
                    _this.save();
                });
            });
        }
        BlogEdit.prototype.save = function () {
            var data = {
                imageUrl: $('[name="image"]').val(),
                preview: $('[name="preview"]').val(),
                content: this.getText(),
                tags: $('#tag-select').selectpicker('val'),
                type: $('#blog-type').selectpicker('val'),
                isActive: $('#blog-active').selectpicker('val') === "1",
            };
            var tags = $('#blog-new-tags').val().split(', ');
            if (tags.length && tags[0]) {
                data.new_tags = tags;
            }
            $.ajax({
                url: "/admin/blog/edit/" + this.blog._id,
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function () {
                window.location.replace('/admin/blogs');
            });
        };
        BlogEdit.prototype.getText = function () {
            return this.simplemde.value();
        };
        return BlogEdit;
    }());
    return BlogEdit;
});
