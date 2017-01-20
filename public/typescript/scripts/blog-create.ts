
import * as $ from 'jquery';
import * as SimpleMDE from 'simplemde';
import * as Marked from 'marked';

export class BlogCreate {
    simplemde: any;

    constructor(element_id: string) {
        this.simplemde = new SimpleMDE({
            element: document.getElementById(element_id),
            previewRender: (text: string) => Marked(text)
        });
    }

    save(data: any) {
        data.content = Marked(this.simplemde.value());
        
        return $.ajax({
            url: '/blogs/create',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    }
}