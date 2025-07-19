import { LightningElement } from 'lwc';

export default class HtmlDataTable extends LightningElement {
    data = [
        { id: 1, name: 'John Doe', age: 28, Description: 'Long description provides a text version of information provided in a detailed or complex image. You may already be familiar with simple alternative text, which provides brief descriptions of visual content. But when an image is detailed and complex, simple alternative text isn’t sufficient to capture its meaning.' },
        { id: 2, name: 'Jane Smith', age: 32, Description: 'Long description provides a text version of information provided in a detailed or complex image. You may already be familiar with simple alternative text, which provides brief descriptions of visual content. But when an image is detailed and complex, simple alternative text isn’t sufficient to capture its meaning.' },
        { id: 3, name: 'Sam Green', age: 45, Description: 'Long description provides a text version of information provided in a detailed or complex image. You may already be familiar with simple alternative text, which provides brief descriptions of visual content. But when an image is detailed and complex, simple alternative text isn’t sufficient to capture its meaning.' },
            
    ];
}