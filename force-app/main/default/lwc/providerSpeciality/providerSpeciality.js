import { LightningElement, track, wire } from 'lwc';
import providerSpeciality from '@salesforce/apex/ProviderSpecialityController.providerSpeciality';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
    {
         label: 'Provider Name',
         fieldName: 'PersonName__c',
        
 
     }, {
        label: 'Speciality',
        fieldName: 'Name',
       
    },  {
         label: 'City',
         fieldName: 'ProviderCity__c',
         
 
     }, {
         label: 'Email',
         fieldName: 'ProviderEmail__c',
         
     },  {
         label: 'Phone',
         fieldName: 'Provider_Phone__c',
        
     }
     
 ];

export default class ProviderSpeciality extends LightningElement {
    columns = columns;
    @track hpsObj;
    @track searchKey;
    fldsItemValues = [];
 
    @wire(providerSpeciality,{searchKey: '$searchKey'})
    cons(result) {
        this.hpsObj = result;
        if (result.error) {
            this.hpsObj = undefined;
        }
    };
 
    saveHandleAction(event) {
        this.fldsItemValues = event.detail.draftValues;
        const inputsItems = this.fldsItemValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
       
        const promises = inputsItems.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            this.fldsItemValues = [];
            return this.refresh();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!!',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.fldsItemValues = [];
        });
    }
 
    handleKeywordChange(event){
        this.isSearchChangeExecuted = false;  
        this.searchKey = event.target.value; 
    }
    async refresh() {
        await refreshApex(this.hpsObj);
    }
}