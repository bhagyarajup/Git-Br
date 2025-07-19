
import { LightningElement, api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import hasPermissionSet from '@salesforce/apex/RasicComponentHandler.hasPermissionSet';  
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getActivityOwnerList from '@salesforce/apex/RasicComponentHandler.activityOwnerList';
import getActivityRecords from '@salesforce/apex/RasicComponentHandler.getActivityRecords';
import createNewActivity from 'c/createNewActivity';
import createNewRole from 'c/createNewRole';
import { CloseActionScreenEvent } from 'lightning/actions';
import upsertActivityOwnershipRecords from '@salesforce/apex/RasicComponentHandler.upsertActivityOwnershipRecords';
import NAME_FIELD from '@salesforce/schema/Method__c.Name';

export default class CustomLookupActivityOwnership extends LightningElement {

    @api recordId;
    @api selectedActivityOwnerShipRecord = [];  // use for Activity ownership Record data pass from lwc to flow
    @api methodByActivityListToInsert = [];     // use for Method By Activity Record data pass from lwc to flow
    @api deleteActivityOwnershipRecord = [];     // use for old delte Activity ownership Record data pass from lwc to flow
    @api deleteMethodByActivity = [];            // use for old delete Method By Activity Record data pass from lwc to flow

    selectedActivity = null;
    activityFields = ['Activity__c.Name', 'Activity__c.Related_Method__r.Name'];
    roleFields = ['Role__c.Name'];
    relatedMethodName = null;
    activityOrder = null;
    selectedActivityName = '';
    activityOwnershipData = [];
    showActivityData = false;
    selectedRasicValue = null;
    selectedRole = null;
    roleRecords = [];
    showRoleData = false;
    roleTableData = [];
    isShowEditModal = false;
    selectedActivityRoleId = null;
    activityTableData = [];
    divisionIndex = -1;
    hideHeader = true;

    dragStart;
    isExpanded = false;
    showSpinner = false;
    addLogic = false;
    showExistingActivityModal = false;
    selectedActivityId = null;
    showAddRole = false;
    relatedMethodId = null;
    activityDescription = null;
    addedActivityName = null;
    currentTransactionData = [];
    currentRoleDataList = [];




   
    hasPermission = false;

    @wire(hasPermissionSet, { permissionSetName: 'Methodology_Team_User' })
    checkPermission({ error, data }) {
        if (data) {
            this.hasPermission = data;
        } else if (error) {
            console.error('Error fetching permission set:', error);
        }
    }

    
    hideModalBoxonEdit(){
        
       location.replace(window.location.origin+"/lightning/r/Method__c/"+this.recordId+"/view")
       
    }

    activityColumns = [
        {
            type: "button", typeAttributes: {
                label: '+', name: 'Expand', title: 'Expand', disabled: false, value: 'edit', iconPosition: 'left'
            }
        },
        { label: 'Activity', fieldName: 'Name', hideDefaultActions: true },
        { label: 'Related Method', fieldName: 'RelatedMethodName', hideDefaultActions: true}
         
        
    ];

    activityColumns2 = [
        {
            type: "button", typeAttributes: {
                label: '-', name: 'Collapse', title: 'Collapse', disabled: false, value: 'edit', iconPosition: 'left'
            }
        },
        { label: 'Activity', fieldName: 'Name', hideDefaultActions: true },
        { label: 'Related Method', fieldName: 'RelatedMethodName', hideDefaultActions: true}
         
        
    ];


    roleColumns = [
        { label: 'Role', fieldName: 'RoleName' },
        { label: 'Rasic', fieldName: 'RasicValueString' },
        {
            type: "button", typeAttributes: {
                label: 'Edit', name: 'Edit', title: 'Edit', disabled: false, value: 'edit', iconPosition: 'left'
            }
        }
    ];




    @wire(getRecord, { recordId: '$selectedActivity', fields: '$activityFields' })
    findActivityName({ error, data }) {
        if (data) {
            this.relatedMethodName = data.fields.Related_Method__r.displayValue;
            this.selectedActivityName = data.fields.Name.value;
            //this.activityOrder = data.fields.Order__c.value;
        } else if (error) {
            console.error('Error:', error);
        }
    }

    /**Wire Method to get the Role Name */
    @wire(getRecord, { recordId: '$selectedRole', fields: '$roleFields' })
    findRoleName({ error, data }) {
        let index = this.roleRecords.findIndex(ele => ele.Id == this.selectedRole);
        if (data && index == -1) {
            const roleData = data;
            let roleName = roleData.fields.Name.value;
            this.roleRecords.push({ 'Id': this.selectedRole, 'Name': roleName });
        }
    }

    @wire(getRecord, { recordId: '$relatedMethodId', fields: [NAME_FIELD] })
    wiredRecord({ error, data }) {
        if (data) {
            this.relatedMethodName = data.fields.Name.value;
        } else if (error) {
            console.error('Error fetching related method name:', error);
        }
    }
    async connectedCallback(){
        this.showSpinner = true;
        await Promise.resolve();
        this.getActivityOwnerList();
        this.showSpinner = false;
    }

    getActivityOwnerList() {
        getActivityOwnerList({ methodId: this.recordId }).then(result => {
            if (result) {
                let activityIds = [];
                this.activityOwnershipData = []; //clear and add on reorder

                for (let i = 0; i < result.length; i++) {
                    activityIds.push(result[i].Activity__c);
                    this.roleRecords.push({ 'Id': result[i].Role__c, 'Name': result[i].Role__c ? result[i].Role__r.Name : null });
                    this.activityOwnershipData.push(JSON.parse(JSON.stringify(result[i])));
                }
                // console.log('activityOwnershipData push : ', this.activityOwnershipData);

                if (activityIds.length > 0) {
                    getActivityRecords({ activityIds: activityIds }).then(activityRecords => {
                        for (let i = 0; i < this.activityOwnershipData.length; i++) {
                            let currentRecord = this.activityOwnershipData[i];
                            let activityRecord = activityRecords.find(ele => ele.Id == currentRecord.Activity__c);
                            currentRecord.activityName = activityRecord?.Name;
                            currentRecord.relatedMethodName = activityRecord?.Related_Method__r?.Name;
                            currentRecord.activityRoleId = currentRecord.Activity__c + '-' + currentRecord.Role__c;
                            currentRecord.selectedRasicValue = this.importRasicValue(currentRecord);
                            currentRecord.activityOwnerShipId = currentRecord.Id;
                            currentRecord.Order = activityRecord?.Order__c;
                        }
                        this.showActivityData = true;
                        this.prepareActivityTableData();
                    });
                }
            }
        });
    }

    saveRecords(){


        if(this.activityOwnershipData && this.activityOwnershipData.length > 0){
            let recordsToBeUpserted=[];
            let activityOrderMap={};
            for(let i=0; i<this.activityOwnershipData.length;i++){

                if(this.activityOwnershipData[i].Role__c){
                    let index = recordsToBeUpserted.findIndex(ele=>!ele.Role__c && ele.Activity__c == this.activityOwnershipData[i].Activity__c);
                    if(index != -1){
                        this.activityOwnershipData[i].Order__c = recordsToBeUpserted[index].Order__c;
                        activityOrderMap[this.activityOwnershipData[i].Activity__c] = this.activityOwnershipData[i].Order__c;

                        if(recordsToBeUpserted[index].Id){
                            deleteRecord(recordsToBeUpserted[index].Id);
                        }

                        recordsToBeUpserted.splice(index, 1, this.activityOwnershipData[i]);
                    }else{
                        if(!this.activityOwnershipData[i].Order__c){
                            this.activityOwnershipData[i].Order__c = activityOrderMap[this.activityOwnershipData[i].Activity__c];
                        }
                        recordsToBeUpserted.push(this.activityOwnershipData[i]);
                    }
                }else{
                    let index = recordsToBeUpserted.findIndex(ele=>ele.Activity__c == this.activityOwnershipData[i].Activity__c);
                    if(index = -1){
                        recordsToBeUpserted.push(this.activityOwnershipData[i]);
                    }
                }
            }
            upsertActivityOwnershipRecords({records : recordsToBeUpserted, methodId : this.recordId}).then(()=>{
                this.showToast('Success', 'RASIC changes are saved.', 'success', 'dismissable');
                this.closeQuickAction();
            });
        }else{
            this.showToast('Error', 'No records to be saved.', 'error', 'dismissable');
        }
       
    }

    clearSelectedData() {
        this.selectedRasicValue = null;
        this.selectedRole = null;
        this.selectedActivityRoleId = null;

        this.selectedActivity = null;
        this.relatedMethodName = null;
        this.activityOrder = null;
        this.currentRoleDataList = [];
        this.currentTransactionData = [];
    }


    handleRasicChange(event) {

        this.selectedRasicValue = this.convertToRASICArr(event.detail.value);
    }

    //create function to convert javascript string to array of values separated by comma

    convertToRASICArr(rasicString){
        if(rasicString){
            return rasicString.split(",")
        }
        return [];
    }

    get showActivityDiv(){
        if(this.activityTableData && this.activityTableData.length > 0){
            return true;
        }else{
            this.prepareActivityTableData();
            if(this.activityTableData && this.activityTableData.length > 0){
                return true;
            }
        }
        return false;
    }

    get rasicOptions() {
        return [
            { label: 'Responsible', value: 'R' },
            { label: 'Accountable', value: 'A' },
            { label: 'Responsible & Accountable', value: 'R,A' },
            { label: 'Supports', value: 'S' },
            { label: 'Informed', value: 'I' },
            { label: 'Consulted', value: 'C' },
        ];
    }

    handleAddRole() {
        if (this.isRequiredValidationPassed() && this.isAddRoleValidationPassed()) {
            this.activityOwnershipData = this.reactivePush(this.activityOwnershipData, this.createActivityOwnershipRecord());
            this.showActivityData = true;
            this.divisionIndex = -1;
            this.showActivityData2 = false;
            this.showActivityData3 = false;
            this.showRoleData = false;
            this.clearSelectedData();
        }
    }

    handleEditRole() {
        if (this.isRequiredValidationPassed() && this.isEditRoleValidationPassed()) {
            let updatedActivityOwnershipRecord = this.createActivityOwnershipRecord();
            let index = this.activityOwnershipData.findIndex(ele => ele.activityRoleId == this.selectedActivityRoleId);
            updatedActivityOwnershipRecord.Id = this.activityOwnershipData[index].Id;
            updatedActivityOwnershipRecord.localId = this.activityOwnershipData[index].localId;
            // remove the existing record at above index and add the updated record there
            this.activityOwnershipData.splice(index, 1, updatedActivityOwnershipRecord);
            this.prepareActivityTableData();
            let activityData = this.activityTableData.find(ele => ele.Id == updatedActivityOwnershipRecord.Activity__c);

            this.refreshRoleTableData(activityData);
            this.handleHideModal()
        }
    }

    reactivePush(arr, element) {
        let tempArr = [];
        tempArr.push(...arr);
        tempArr.push(element);
        arr = [];
        arr.push(...tempArr);
        return arr;
    }

    prepareActivityTableData() {
        let tableData = [];
        if(!this.activityOwnershipData){
            this.activityOwnershipData = [];
        }
        for (let i = 0; i < this.activityOwnershipData.length; i++) {
            let currentData = this.activityOwnershipData[i];
            let index = tableData.findIndex(ele => ele.Id == currentData.Activity__c);
            if (index == -1) {
                tableData.push({
                    'Name': currentData.activityName, 'RelatedMethodName': currentData.relatedMethodName ? currentData.relatedMethodName : null, 'Id': currentData.Activity__c, 'Order' : currentData.Order__c,
                    'RelatedMethodId': currentData.RelatedMethodId,
                    'RolesData': currentData.activityRoleId ? [currentData.activityRoleId] : [], 'activityOwnerShipId': currentData.Id,
                    'isExpanded': this.isExpanded, 'buttonIcon': 'utility:chevronright', 'buttonText': 'expand'
                })
            } else {
                tableData[index].RolesData.push(currentData.activityRoleId);
            }
        }
        this.activityTableData = tableData;
        this.showSpinner = false;
        return tableData;
    }

    

    importRasicValue(activityOwnershipRecord){
        let rasicValue = [];
        if(activityOwnershipRecord.Responsible__c == 'Yes'){
            rasicValue.push('R');
        }
        if(activityOwnershipRecord.Accountable__c == 'Yes'){
            rasicValue.push('A');
        }
        if(activityOwnershipRecord.Support__c == 'Yes'){
            rasicValue.push('S');
        }
        if(activityOwnershipRecord.Informed__c == 'Yes'){
            rasicValue.push('I');
        }
        if(activityOwnershipRecord.Consulted__c == 'Yes'){
            rasicValue.push('C');
        }

        return rasicValue;
    }

    populateOwnershipRecords(){
        this.selectedActivityOwnerShipRecord=[];
        for(let i=0;i<this.activityOwnershipData.length;i++){
            let record = {};
            let data = this.activityOwnershipData[i];
            record.Activity__c = data.Activity__c;
            record.Role__c = data.Role__c;
            record.Id = data.Id;

            record.Responsible__c = data.Responsible__c;
            record.Accountable__c = data.Accountable__c;
            record.Support__c = data.Support__c;
            record.Informed__c = data.Informed__c;
            record.Consulted__c = data.Consulted__c;

            this.selectedActivityOwnerShipRecord.push(record);
        }
    }

    getMaxOrder() {
        let arr = this.activityTableData;
        if (arr && arr.length > 0) {
            let max = arr[0].Order;
            arr.forEach(ele => {
                if (ele.Order > max) {
                    max = ele.Order;
                }
            });
            return max;
        }
        return 0;
    }

    

    createActivityOwnershipRecord() {
        let activityOwnershipRecord = {};
        activityOwnershipRecord.activityName = this.addLogic ? this.addedActivityName : this.selectedActivityName;
        activityOwnershipRecord.relatedMethodName = this.relatedMethodName ? this.relatedMethodName : null;
        activityOwnershipRecord.Role__c = this.selectedRole != null ? this.selectedRole : '';
        activityOwnershipRecord.relatedMethodId = this.relatedMethodId;

        if(this.addLogic){
            activityOwnershipRecord.Order__c = this.getMaxOrder() + 1;
        }


        //keep it empty when either activity or role is null
        if ((this.addLogic && !this.selectedActivityId) || (!this.addLogic && !this.selectedActivity) || !this.selectedRole) {
            activityOwnershipRecord.activityRoleId = '';
        } else {
            activityOwnershipRecord.activityRoleId = (this.addLogic ? this.selectedActivityId : this.selectedActivity) + '-' + this.selectedRole;
        }       
        activityOwnershipRecord.Activity__c = this.addLogic ? this.selectedActivityId : this.selectedActivity;
        activityOwnershipRecord.selectedRasicValue = this.selectedRasicValue;


        activityOwnershipRecord.Responsible__c = this.IsRasicValuePresent('R') ? 'Yes' : 'No';
        activityOwnershipRecord.Accountable__c = this.IsRasicValuePresent('A') ? 'Yes' : 'No';
        activityOwnershipRecord.Support__c = this.IsRasicValuePresent('S') ? 'Yes' : 'No';
        activityOwnershipRecord.Informed__c = this.IsRasicValuePresent('I') ? 'Yes' : 'No';
        activityOwnershipRecord.Consulted__c = this.IsRasicValuePresent('C') ? 'Yes' : 'No';
        return activityOwnershipRecord;
    }

    IsRasicValuePresent(val) {
        if (this.selectedRasicValue) {
            let arr = Object.values(this.selectedRasicValue);
            if (arr.findIndex(value => value == val) != -1) {
                return true;
            }
        }

        return false;
    }

    callRoleAction(event) {
        this.selectedActivityRoleId = event.target.dataset.activityRoleId;
        let activityOwnershipRecord = this.activityOwnershipData.find(ele => ele.activityRoleId == this.selectedActivityRoleId);
        this.selectedActivity = activityOwnershipRecord.Activity__c;
        this.relatedMethodName = activityOwnershipRecord.relatedMethodName;
        this.selectedRole = activityOwnershipRecord.Role__c;
        this.selectedRasicValue = activityOwnershipRecord.selectedRasicValue;
        this.isShowEditModal = true;
    }

    callRoleDeleteAction(event) {
        this.showSpinner = true;
        this.selectedActivityRoleId = event.target.dataset.activityRoleId;
        let activityOwnershipRecord = this.activityOwnershipData.find(ele => ele.activityRoleId == this.selectedActivityRoleId);
        let activityOwnershipRecordId = activityOwnershipRecord ? activityOwnershipRecord.Id : '';
        if (activityOwnershipRecordId) {
            deleteRecord(activityOwnershipRecordId) //delete existing activity ownership records
                .then(() => {
                    this.showToast('success', 'Role is removed successfully!', 'success', 'dismissable');
                    this.getActivityOwnerList();
                    this.showSpinner = false;
                })
                .catch((error) => {
                    this.showSpinner = false;
                });
        }
        else {
            //delete temp added activity ownership records
            this.activityOwnershipData = this.activityOwnershipData.filter(record => record.activityRoleId != this.selectedActivityRoleId);
            // this.currentTransactionData = this.currentTransactionData.filter(record => record.activityRoleId != this.selectedActivityRoleId);
            this.prepareActivityTableData();
            this.activityTableData = [...this.activityTableData]; //reactive call
            this.showToast('success', 'Role is removed successfully!', 'success', 'dismissable');
            this.showSpinner = false;
        }

    }

    /** this function use for hide modal */
    handleHideModal() {
        this.isShowEditModal = false;
        this.showAddRole = false;
        this.showExistingActivityModal = false;
        this.clearSelectedData();
    }

    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleRoleChange(event) {
        this.selectedRole = event.target.value;
    }

    isRequiredValidationPassed() {
        if (!this.selectedActivity) {
            this.showToast('Validation Error', 'Please select Activity', 'error', 'dismissable');
            return false;
        }
        if (!this.selectedRole) {
            this.showToast('Validation Error', 'Please select Role', 'error', 'dismissable');
            return false;
        }
        if (!this.selectedRasicValue) {
            this.showToast('Validation Error', 'Please select RASIC Values', 'error', 'dismissable');
            return false;
        }

        return true;
    }

    isAddRequiredValidationPassed() {
        if (this.addLogic) {
            if (!this.addedActivityName) {
                this.showToast('Validation Error', 'Please select Activity', 'error', 'dismissable');
                return false;
            }
        }
        else {
            if (!this.selectedActivity) {
                this.showToast('Validation Error', 'Please select Activity', 'error', 'dismissable');
                return false;
            }
        }
        return true;
    }
    
    isAddRoleValidationPassed() {

        if (this.activityOwnershipData.findIndex(ele => ele.activityRoleId == this.selectedActivity + '-' + this.selectedRole) != -1) {
            this.showToast('Validation Error', 'Activity for selected role is already added. Please select different values.', 'error', 'dismissable');
            return false;
        }

        if (this.IsRasicValuePresent('R') && (this.activityOwnershipData.findIndex(ele => ele.Responsible__c == 'Yes' && ele.Activity__c == this.selectedActivity) != -1)) {
            this.showToast('Validation Error', 'One Activity can only have 1 Responsible RASIC Value', 'error', 'dismissable');
            return false;
        }

        if (this.IsRasicValuePresent('A') && (this.activityOwnershipData.findIndex(ele => ele.Accountable__c == 'Yes' && ele.Activity__c == this.selectedActivity) != -1)) {
            this.showToast('Validation Error', 'One Activity can only have 1 Accountable RASIC Value', 'error', 'dismissable');
            return false;
        }

        return true;
    }

    isEditRoleValidationPassed() {

        let tempOwnershipData = [];

        if(!this.activityOwnershipData){
            return true;
        }

        // excluding the currently selected data from an existing data
        for (let i = 0; i < this.activityOwnershipData.length; i++) {
            let currentRecord = this.activityOwnershipData[i];

            if (currentRecord.activityRoleId != this.selectedActivityRoleId) {
                tempOwnershipData.push(currentRecord);
            }
        }

        if (tempOwnershipData.findIndex(ele => ele.activityRoleId == this.selectedActivity + '-' + this.selectedRole) != -1) {
            this.showToast('Validation Error', 'Activity for selected role is already added. Please select different values.', 'error', 'dismissable');
            return false;
        }

        if (this.IsRasicValuePresent('R') && (tempOwnershipData.findIndex(ele => ele.Responsible__c == 'Yes' && ele.Activity__c == this.selectedActivity) != -1)) {
            this.showToast('Validation Error', 'One Activity can only have 1 Responsible RASIC Value', 'error', 'dismissable');
            return false;
        }

        if (this.IsRasicValuePresent('A') && (tempOwnershipData.findIndex(ele => ele.Accountable__c == 'Yes' && ele.Activity__c == this.selectedActivity) != -1)) {
            this.showToast('Validation Error', 'One Activity can only have 1 Accountable RASIC Value', 'error', 'dismissable');
            return false;
        }

        return true;
    }

    /** this function use for create new Activity */
    async createActivity() {
        const result = await createNewActivity.open({
            size: 'small',
            description: 'Accessible description of modal\'s purpose',
        });
        if (result != undefined) {
            console.log('result --> '+JSON.stringify(result));
            if (result?.hasOwnProperty('id')) {
                this.selectedActivity = result.id;
                this.showToast('Success', 'A new Activity Created', 'success', 'dismissable');
            } else {
                this.showToast('ERROR', 'Something went wrong, contact System administrator', 'error', 'dismissable');
            }
        }
    }


    handleActivityChange(event) {
        this.selectedActivity = event.target.value;
        console.log('selectedActivity --> '+JSON.stringify(this.selectedActivity));
    }

    refreshRoleTableData(currentActivityData) {
        this.roleTableData = [];
        for (let i = 0; i < currentActivityData?.RolesData?.length; i++) {
            let activityRoleId = currentActivityData.RolesData[i];
            let activityOwnerShipRecord = this.activityOwnershipData.find(ele => ele.activityRoleId == activityRoleId);
            if (activityOwnerShipRecord) {
                // let roleName = (this.roleRecords.find(ele => ele.Id == activityOwnerShipRecord.Role__c)).Name;
                let roleRecord = this.roleRecords.find(ele => ele.Id == activityOwnerShipRecord.Role__c);
                if (roleRecord) {
                    let roleName = roleRecord.Name;
                    if (roleName) {
                        let rasicValues = [];
                        if (activityOwnerShipRecord.Responsible__c == 'Yes') {
                            rasicValues.push('R')
                        }
                        if (activityOwnerShipRecord.Accountable__c == 'Yes') {
                            rasicValues.push('A')
                        }
                        if (activityOwnerShipRecord.Support__c == 'Yes') {
                            rasicValues.push('S')
                        }
                        if (activityOwnerShipRecord.Informed__c == 'Yes') {
                            rasicValues.push('I')
                        }
                        if (activityOwnerShipRecord.Consulted__c == 'Yes') {
                            rasicValues.push('C')
                        }
                        this.roleTableData = this.reactivePush(this.roleTableData, { 'activityRoleId': activityOwnerShipRecord.activityRoleId, 'RoleName': roleName, 'RasicValueString': rasicValues.join() });
                        currentActivityData.roleTableData1 = this.roleTableData;
                    }
                }
            }
        }
        this.showRoleData = true;
    }

    /** this function use for get the roles for current edit activity */
    callActivityAction(event) {
        const recordId = event.currentTarget.dataset.id;
        const currentActivityData = this.activityTableData.find(ele => ele.Id === recordId);
        if (!currentActivityData) {
            console.error('Record not found');
            return;
        }
        this.divisionIndex = this.activityTableData.findIndex(ele => ele.Id === currentActivityData.Id);

        // Collapse all other items
        this.activityTableData.forEach(activity => {
            if (activity.Id !== recordId) {//all other records
                activity.isExpanded = false;
                activity.buttonIcon = 'utility:chevronright';
                activity.buttonText = 'expand';
                activity.roleTableData1 = [];
            }
            else { //clicked record
                activity.buttonIcon = event.target.iconName == 'utility:chevronright' ? 'utility:chevrondown' : 'utility:chevronright';
                activity.buttonText = event.target.alternativeText == 'expand' ? 'collapse' : 'expand';
            }
        });
        currentActivityData.isExpanded = !currentActivityData.isExpanded;
        if (currentActivityData.isExpanded == false) { //collapse
            this.showActivityData = true;
            this.divisionIndex = -1;
            this.refreshRoleTableData(currentActivityData);
            this.showRoleData = false;
            currentActivityData.roleTableData1 = [];
        } else {//expand
            if (currentActivityData.isExpanded) { // Expand Logic
                this.refreshRoleTableData(currentActivityData);
            }
        }
        this.activityTableData = [...this.activityTableData]; //reactive call
}




    /**This is to reuse the lightning toast message api */
    showToast(title, message, variant, mode) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(event);
    }

    /** this function use for create new Role */
    async createRole() {
        const result = await createNewRole.open({
            size: 'small',
            description: 'Accessible description of modal\'s purpose',
        });
        if (result != undefined) {
            if (result?.hasOwnProperty('id')) {
                this.showToast('Success', 'A new Role Created', 'success', 'dismissable');
            } else {
                this.showToast('ERROR', 'Something went wrong, contact System administrator', 'error', 'dismissable');
            }
        }
    }

    DragStart(e) {
        this.dragStart = e.target.dataset.row;
        e.target.classList.add("drag");
    }

    DragOver(event) {
        event.preventDefault();
        return false;
    }

    DragLeave(event) {
    }

    Drop(event) {
        event.stopPropagation();
        this.showSpinner = true;
        const DragValName = parseInt(this.dragStart, 10);
        const DropValName = parseInt(event.currentTarget.dataset.row, 10);
        if (isNaN(DragValName) || isNaN(DropValName)) {
            console.error('DragValName or DropValName is not a valid number');
            this.showToast('Error', 'Please drop the item in the correct place to reorder.', 'error', 'dismissable');
            this.showSpinner = false;
            return false;
        }
        if (DragValName === DropValName) {
            return false;
        }
        const currentIndex = DragValName;
        const newIndex = DropValName;
        if (Array.isArray(this.activityTableData)) {
            this.activityTableData = this.moveArrayElement(this.activityTableData, currentIndex, newIndex);
            let myData = this.activityTableData.map((item, index) => ({
                Id: item.activityOwnerShipId,
                Order__c: index+1,
                Activity__c:  item.Id
                
            }));
            this.updateActivityOwnership(myData);
            //this.showSpinner = false;
        } else {
            console.error('activityTableData is not an array');
            this.showSpinner = false;
        }
    }

    updateActivityOwnership(myData) {
        let recordsToBeUpdated = [];

        if(myData && this.activityOwnershipData){
            for(let i=0; i<myData.length; i++){
                for(let j=0;j<this.activityOwnershipData.length;j++){
                    if(this.activityOwnershipData[j].Activity__c == myData[i].Activity__c ){
                        this.activityOwnershipData[j].Order__c = myData[i].Order__c;
                        recordsToBeUpdated.push(this.activityOwnershipData[j]);
                    }
                }
            }
            upsertActivityOwnershipRecords({ records: recordsToBeUpdated, methodId : this.recordId }).then(result => {
                this.getActivityOwnerList(); // call to fetch latest data
                this.showToast('Success', 'Activities have been reordered successfully.', 'success', 'dismissable');
            }).catch(error => {
                // console.log('Error updating order:', JSON.stringify(error));
                this.showSpinner = false;
                if (error.body && error.body.message && error.body.message.includes('MISSING_ARGUMENT')) {
                    this.showToast('Error', 'Unable to reorder. Please save the new activity before reordering.', 'error', 'dismissable');
                } else {
                    this.showToast('Error', 'An unexpected error occurred while reordering.', 'error', 'dismissable');
                }
            });
        }
    }

    moveArrayElement(array, fromIndex, toIndex) {
        if (fromIndex >= 0 && fromIndex < array.length && toIndex >= 0 && toIndex < array.length) {
            // Remove the element and shift items from the original position
            const element = array.splice(fromIndex, 1)[0];
            array.splice(toIndex, 0, element);
            return array;
        } else {
            console.error('Invalid indices for move operation');
            this.showSpinner = false;
            return array;
        }
    }

    initialiseRolesRow() {
        return [{
            Role__c: null,
            selectedRasicValue: null,
            activityRoleId: '',
            Accountable__c: "No",
            Consulted__c: "No",
            Informed__c: "No",
            Responsible__c: "No",
            Support__c: "No",
            localId: "",
            isDisabled: false,
        }];
    }

    handleAddRole(e) {
        // console.log('handleAddRole : ', e.target.dataset.id);
        this.showAddRole = true;
        this.selectedActivity = e.target.dataset.id;
        this.currentRoleDataList = this.initialiseRolesRow();
    }
    localIdCounter = 0;

    generateLocalId() {
        return `local-id-${this.localIdCounter++}`;
    }

    //Add multiple roles rows
    handleAddRoleCheck() {
        if (this.isRequiredValidationPassed() && this.isEditRoleValidationPassed()) {
            //save the current role
            let currentRoleData = this.createActivityOwnershipRecord();
            currentRoleData.localId = this.generateLocalId();
            currentRoleData.isDisabled = true;//make current record non editable
            currentRoleData.selectedRole = this.selectedRole;
            this.currentTransactionData = this.reactivePush(this.currentTransactionData, currentRoleData);//current transaction data
            this.activityOwnershipData = this.reactivePush(this.activityOwnershipData, currentRoleData);//overall data
            this.prepareActivityTableData();
            //new empty row
            let newEmptyRecord = this.initialiseRolesRow();
            newEmptyRecord[0].localId = this.generateLocalId();
            newEmptyRecord[0].isDisabled = false;//make new record editable
            this.currentRoleDataList = [...newEmptyRecord, ...this.currentTransactionData];
            this.resetRoleValues();
        }
    }

    resetRoleValues() {
        this.selectedRole = '';
        this.selectedRasicValue = null;
    }

    handleSaveFinish() {
        if (this.isRequiredValidationPassed() && this.isEditRoleValidationPassed()) {
            //save the current role & close the modal
            let currentRoleData = this.createActivityOwnershipRecord();
            currentRoleData.localId = this.generateLocalId();
            this.activityOwnershipData = this.reactivePush(this.activityOwnershipData, currentRoleData);//overall data
            this.prepareActivityTableData();
            this.resetRoleValues();
            this.handleHideModal();
        }
    }

    handleSelectActivity() {
        this.showExistingActivityModal = true;
    }


    handleActivityAdded(event) {
        this.addedActivityName = event.target.value;
    }

    handleMethodChange(event) {
        this.relatedMethodId = event.target.value;
    }

    handleDescChange(event){
        this.activityDescription = event.target.value;
    }

    //New activity added
    handleSubmit(event) {
        this.addLogic = true;
        this.showSpinner = true;
        event.preventDefault();
        const fields = event.detail.fields;
        fields["Name"] = this.addedActivityName;
        fields["Related_Method__c"] = this.relatedMethodId;
        fields["Description__c"] = this.activityDescription;
        fields["Method__c"] = this.recordId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event) {
        this.selectedActivityId = event.detail.id;//set new activity Id
        if (this.isAddRequiredValidationPassed()) {
            this.activityOwnershipData = this.reactivePush(this.activityOwnershipData, this.createActivityOwnershipRecord());
            this.showActivityData = true;
            this.divisionIndex = -1;
            this.showRoleData = false;
            this.clearSelectedData();
            this.prepareActivityTableData();
            //reset
            this.addedActivityName = null;
            this.relatedMethodId = null;
            this.activityDescription = null;
        //}
        this.showToast('Success', 'A new Activity Created', 'success', 'dismissable');
        this.addLogic = false;
        this.showSpinner = false;
    }
}

    handleOnError(e) {
        this.addLogic = false;
        this.showToast('error', 'Something went wrong, contact System administrator', 'error', 'dismissable');
    }

    //select existing activty logic
    handleSaveActivity() {
        if (this.isAddRequiredValidationPassed()) {
            let newActivityOwnershipRecord = this.createActivityOwnershipRecord();
            // Check if the activity with the same activityRoleId already exists in the list
            let isDuplicate = this.activityOwnershipData.some(record =>
                record.relatedMethodName == newActivityOwnershipRecord.relatedMethodName &&
                record.Activity__c == newActivityOwnershipRecord.Activity__c
            );
            // If it's not a duplicate, add the new record to the list
            if (!isDuplicate) {
                this.showActivityData = true;
                this.activityOwnershipData = this.reactivePush(this.activityOwnershipData, newActivityOwnershipRecord);
                this.prepareActivityTableData();
                this.handleHideModal();
            } else {
                // console.log('The selected activity is already in the list.');
                this.showToast('error', 'The selected activity is already in the list.', 'error', 'dismissable');
            }
        // }
        // else {
        //     // console.log('error : ', handleSaveActivity);
        // }
        }
    }
}
