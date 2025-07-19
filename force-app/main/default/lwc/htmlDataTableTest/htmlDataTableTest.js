import { LightningElement } from 'lwc';

export default class HtmlDataTableTest extends LightningElement {
    data = [
        { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
        { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
        { id: '3', name: 'Michael Johnson', email: 'michael.j@example.com', phone: '555-8765' }
    ];
}