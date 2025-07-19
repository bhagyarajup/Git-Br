import { LightningElement } from 'lwc';

export default class CheckboxDropdown extends LightningElement {
    options = [
        { label: 'Option 1', value: 'option1', checked: false },
        { label: 'Option 2', value: 'option2', checked: false },
        { label: 'Option 3', value: 'option3', checked: false },
        { label: 'Option 4', value: 'option4', checked: false }
    ];
    selectedOptions = [];
    handleOptionChange(event) {
        let selectedOption = event.detail.value;
        let updatedOptions = this.options.map(option => {
            if (option.value === selectedOption) {
                option.checked = !option.checked;
            }
            return option;
        });
        this.options = updatedOptions;
        this.selectedOptions = updatedOptions.filter(option => option.checked).map(option => option.value);
    }
    
}