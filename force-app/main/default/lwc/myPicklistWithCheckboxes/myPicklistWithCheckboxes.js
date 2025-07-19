import { LightningElement } from 'lwc';

export default class MyPicklistWithCheckboxes extends LightningElement {
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

    handleOptionRemove(event) {
        const option = event.target.closest('.slds-pill').dataset.option;
        this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    }
}