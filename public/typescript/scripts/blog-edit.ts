/// <amd-dependency path="bootstrap_select" />
/// <amd-dependency path="bootstrap_validator" />
/// <reference path="../../../typings/index.d.ts" />

import * as $ from 'jquery';
import * as SimpleMDE from 'simplemde';
import * as Marked from 'marked';

class BlogEdit {
    simplemde: any;

    constructor(element_id: string, public blog: any) {

        const _this = this;

        _this.simplemde = new SimpleMDE({
            element: document.getElementById(element_id),
            previewRender: (text: string) => Marked(text),
            promptURLs: true,
            initialValue: _this.blog.content,
            autosave: {
                enable: true,
                uniqueid: 'simplemde_id',
                delay: 10000
            }
        });

        $(document).ready(() => {
            $('select').selectpicker();
            $('#tag-select').selectpicker('val', _this.blog.tags.map((tag: any) => tag._id));
            $('#blog-type').selectpicker('val', _this.blog.type);
            $('#blog-active').selectpicker('val', _this.blog.isActive ? '1': '0');

            $('form').validator().on('submit', (e: JQueryEventObject) => {
                const is_valid = !e.isDefaultPrevented();
                
                if (!is_valid) return;

                e.preventDefault();

                _this.save();
            });
        });
    }

    save(): void {
        const data = {
            imageUrl: $('[name="image"]').val(),
            preview: $('[name="preview"]').val(),
            content: this.getText(),
            tags: $('#tag-select').selectpicker('val'),
            type: $('#blog-type').selectpicker('val'),
            isActive: $('#blog-active').selectpicker('val') === "1",
        };

        const tags = $('#blog-new-tags').val().split(', ');

        if (tags.length && tags[0]) {
            data.new_tags = tags;
        }

        $.ajax({
            url: `/admin/blog/edit/${this.blog._id}`,
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).then(() => {
            window.location.replace('/admin/blogs');
        });
    }

    getText(): string {
        return this.simplemde.value();
    }
}

export = BlogEdit;