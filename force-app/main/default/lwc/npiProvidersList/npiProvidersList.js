import { LightningElement, track, wire} from 'lwc';
import providers from '@salesforce/apex/ShowProviderList.providers';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
   {
        label: 'Provider Name',
        fieldName: 'Name',
       

    }, {
        label: 'City',
        fieldName: 'BillingCity',
        

    }, {
        label: 'Email',
        fieldName: 'PersonEmail',
        
    },  {
        label: 'Phone',
        fieldName: 'Phone',
       
    }
];

export default class NpiProvidersList extends LightningElement {
    columns = columns;
    @track accObj;
    @track searchKey;
    fldsItemValues = [];
 
    @wire(providers,{searchKey: '$searchKey'})
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
 
    handleKeywordChange(event){
        this.isSearchChangeExecuted = false;  
        this.searchKey = event.target.value; 
    }
    async refresh() {
        await refreshApex(this.accObj);
    }
}