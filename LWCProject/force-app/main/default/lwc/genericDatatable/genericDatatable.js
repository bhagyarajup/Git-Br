import { LightningElement,api } from 'lwc';

export default class GenericDatatable extends LightningElement {
   @api tableData=[];
   @api toggleSelection=false;
   @api selectedGreenToggle=false;
   greenRecordId;
   nonGreenRecordId;
   handleRowSelection(event){
       console.log(event.target.value);
      // alert(event.target.value);
       console.log('handleRowSelection');
        const selectedRowId = event.target.value; // ID of the selected radio button
        console.log('selectedRowId---', selectedRowId);
        this.SelectedAiScoreId = selectedRowId;
        // Update `isSelected` for the table rows
        if(this.toggleSelection==false){
        this.tableData = this.tableData.map(row => ({
            ...row,
            isSelected:row.Id === selectedRowId,
        }));
    }
    else{
        if(this.selectedGreenToggle){
        this.greenRecordId=event.target.value;
        this.tableData = this.tableData.map(row => ({
            ...row,
            isSelected:row.Id === this.greenRecordId
        }));
        }
        else{
        this.nonGreenRecordId=event.target.value;
        this.tableData = this.tableData.map(row => ({
            ...row,
            isSelected:row.Id === this.greenRecordId
        }));
        }
       
   }   
}
}