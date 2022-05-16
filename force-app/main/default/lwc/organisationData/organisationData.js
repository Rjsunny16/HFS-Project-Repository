import { LightningElement,api, track,wire } from 'lwc';

import findLocation from '@salesforce/apex/FindRelatedAccounts.findLocation';
import findPersonAcc from '@salesforce/apex/FindRelatedAccounts.findPersonAcc';

//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const actions = [
    { label: 'View Providers', name: 'show_details' },
];
export default class SearchAllPolicies extends LightningElement {

    @track columns = [
        {
            type: 'action',
            typeAttributes: {
                rowActions: actions,
            }
        },
    {
        label: 'Name',
        fieldName: 'Name'
        
    },
    {
        label: 'Street',
        fieldName: 'BillingStreet'
    },
    {
        label: 'City',
        fieldName: 'BillingCity'
    },
    {
        label: 'State',
        fieldName: 'BillingState'
    }

];
@track con;
@track accObj;
@api recordId;
message;
@track record;
@track Account;
@wire(  findLocation, {recordId: '$recordId'}) 
cons(result) {
    this.accObj = result;
    console.log("result",this.accObj);
    if (result.error) {
        this.accObj = undefined;
    }
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

}