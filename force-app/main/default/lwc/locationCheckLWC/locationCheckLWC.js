import { LightningElement,track } from 'lwc';

export default class MyComponent extends LightningElement {
 //  @track hostName;
 //     @track url;
    connectedCallback() {
       const  hostName = window.location.host;
       alert(hostName);
       const url = window.location.href;
       alert(url.indexOf('https://'+hostName+'/apex/Dialer?mode=0'));
     
      if (url.indexOf('https://'+hostName+'/apex/Dialer?mode=0') !== -1) {
          alert('inside if');
      } else {
        alert('inside else');
      }
        
    }
   
}