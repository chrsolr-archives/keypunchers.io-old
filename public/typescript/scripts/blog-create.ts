
import * as $ from 'jquery';
import * as SimpleMDE from 'simplemde';
import * as Marked from 'marked';

export class BlogCreate {
    simplemde: any;

    constructor() {
        this.simplemde = new SimpleMDE({ element: $("#md-editor")[0] });
    }

    save() {
        console.log('Save Called!!!');
    }

    getAsHtml() {
        return Marked(this.simplemde.value());
    }
}