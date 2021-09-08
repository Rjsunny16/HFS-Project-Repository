import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import TOTAL_OPPORTUNITY from '@salesforce/schema/Account.Number_of_Opportunity__c';


const fields = [TOTAL_OPPORTUNITY];

export default class WireGetValue extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    account;

    renderedCallback() {
        console.log(this.account.data);
      }
      
    get totalOpp() {
        return getFieldValue(this.account.data, TOTAL_OPPORTUNITY);
    }

}