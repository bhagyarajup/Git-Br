import { LightningElement } from 'lwc';

export default class PicklistWithSearchBoxes extends LightningElement {
options=[{label:'Option 1',value:'1',checked:false},
  {label:'Option 2',value:'2',checked:false},
  {label:'Option 3',value:'3',checked:false},
  {label:'Option 4',value:'4',checked:false},
  {label:'Option 5',value:'5',checked:false}];

  handleSearchChange(event){
      const searchvalue=event.target.value.toLowerCase();
      const filteredOptions = this.options.filter(Option=>Option.label.toLocaleLowerCase().includes(searchvalue));
      this.updateOptions(filteredOptions);
  }
  handleSelectChange(event){
      const selectedvalues = array.from(event.target.selectedOptions,option=>option.value);
      const updatedOptions=this.options.map(option=>({...option,
        checked:selectedvalues.includes(option.value)}));
        this.updateOptions(updatedOptions);
  }
 
}