/// <amd-dependency path="bootstrap_select" />
/// <amd-dependency path="bootstrap_validator" />
/// <reference path="../../../typings/tsd.d.ts" />

import * as $ from 'jquery';
import * as SimpleMDE from 'simplemde';
import * as Marked from 'marked';

export class BlogCreate {
    simplemde: any;

    constructor(element_id: string) {
        const _this = this;

        _this.simplemde = new SimpleMDE({
            element: document.getElementById(element_id),
            previewRender: (text: string) => Marked(text),
            promptURLs: true
        });

        $(document).ready(() => {
            $('#tag-select').selectpicker();
            $('#blog-type').selectpicker();
            $('#blog-active').selectpicker();

            $('form').validator().on('submit', (e: JQueryEventObject) => {
                const is_valid = !e.isDefaultPrevented();
                
                if (!is_valid) return;

                e.preventDefault();

                _this.save();
            });
        });

    }

    save() {
        var data = {
            imageUrl: $('[name="image"]').val(),
            title: $('[name="title"]').val(),
            preview: $('[name="preview"]').val(),
            content: this.getText(),
            tags: $('#tag-select').selectpicker('val'),
            type: $('#blog-type').selectpicker('val'),
            isActive: $('#blog-active').selectpicker('val') === "1",
        };

        $.ajax({
            url: '/blogs/create',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).then(() => {
            window.location.replace('/blogs');
        });
    }

    getText() {
        return this.simplemde.value();
    }
}