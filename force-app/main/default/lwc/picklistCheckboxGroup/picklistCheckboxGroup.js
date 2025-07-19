import { LightningElement } from 'lwc';

export default class PicklistCheckboxGroup extends LightningElement {
 
    options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' }
    ];
    selectedOptions = [];
    
    handleOptionChange(event) {
        this.selectedOptions = event.detail.value;
    }
}