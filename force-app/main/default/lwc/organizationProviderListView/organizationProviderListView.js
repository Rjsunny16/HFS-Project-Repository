import { LightningElement, track, wire, api } from 'lwc';
import organizationProvider from '@salesforce/apex/OrganizationProviderListController.organizationProvider';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import findPersonAcc from '@salesforce/apex/OrganizationProviderListController.findPersonAcc';
const actions = [
    { label: 'View Providers', name: 'show_details' },
];
const columns = [
    
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
        }
    },
    {
         label: 'Organization Name',
         fieldName: 'Name',
        
 
     }, {
        label: 'Tax id',
        fieldName: 'HealthCloudGA__TaxId__c',
       
    },  {
         label: 'Street',
         fieldName: 'BillingStreet',
         
 
     }, {
         label: 'City',
         fieldName: 'BillingCity',
         
     },  {
         label: 'State',
         fieldName: 'BillingState',
        
     }
     
 ];


export default class OrganizationProviderListView extends LightningElement {
    columns = columns;
    @track accObj;
    @track con;
    @api recordId;
    message;
    @track record;
    @track Account;
    @track searchKey;
    fldsItemValues = [];
   
    @wire(organizationProvider,{searchKey: '$searchKey'})
    cons(result) {
        this.accObj = result;
        if (result.error) {
            this.accObj = undefined;
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
    navigateToPerAcc(event){
        this.record = event.detail.row;
        console.log("recordId",this.record.Id);
        findPersonAcc({recordId : this.record.Id})
        .then(result => {
            this.con = result;
        })
        .catch(error =>{
        this.error = error;
    
            })
      }
      
    handleKeywordChange(event){
        this.isSearchChangeExecuted = false;  
        this.searchKey = event.target.value;  
    }
    
    
    async refresh() {
        await refreshApex(this.accObj);
    }

}