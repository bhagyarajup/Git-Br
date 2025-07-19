import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class AccLWCquickActionNewWindow  extends NavigationMixin( LightningElement ) {

    @api recordId;

    @api invoke() {

        console.log( "Inside Invoke Method" );
        console.log( "“Record Id is ” "+ this.recordId );

        this[ NavigationMixin.GenerateUrl ]( {

            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view',
            },

        } ).then( url => {

            console.log( "‘URL is ‘ "+ url );
            let completeURL = '/apex/accVFButton?recId='+recordId;
          /*  let windowFeatures = "menubar=no,resizable=yes,scrollbars=yes";
            windowFeatures  = "width=" + screen.width;
            windowFeatures += "",height="" + screen.height; */
            console.log( 'Complete URL is ' + completeURL );
            //alert('new winwos');
            window.open( completeURL, "_blank" );


        } );

    }

}