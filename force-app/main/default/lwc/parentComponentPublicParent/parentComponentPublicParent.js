import { LightningElement,track } from 'lwc';

export default class ParentComponentPublicParent extends LightningElement {
    @track vcolor='';
    colorSelection(event){
     //   alert(event.target.value);
        this.vcolor=event.target.value;
     //   alert(this.vcolor);   
    }
    buttonselect(){
        //alert('clicked on parent');
      //  console.log('before component'+this.template.querySelector('c-child-component-public-method'));
      const  childcmp = this.template.querySelector('c-child-component-public-method');
      //      console.log('after component'+childcmp);
        const returnstament = childcmp.selectCheckBox(this.vcolor);
         // console.log('after child method call ');
          console.log('return statiement of the method is '+returnstament);
        
    }
}