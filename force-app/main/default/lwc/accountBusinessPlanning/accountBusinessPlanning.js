import { LightningElement, api, track} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME from '@salesforce/schema/Account.Name';
import TARGET_REVENUE from '@salesforce/schema/Account.Full_Year_Target_Revenue__c';
import Financial_Year from '@salesforce/schema/Account.Financial_Year__c';
import Campaign_Budget from '@salesforce/schema/Account.Campaign_Budget__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



const arrFields = [TARGET_REVENUE];

export default class AccountBusinessPlanning extends LightningElement{
    @track accountId;
    @track records;
    @track errorMsg;   
    // connectedCallback(){
    //     fetchAccount()
    //     .then(result => {
    //                     this.acc = result;

    //                     console.log(JSON.stringify(result));
    //                     console.log("result",this.acc);
    //                     })

    //     }
    //@wire (fetchAccount, {accId:'$accountId'})
    // handleChangeAction(event){
    //   this.accountId = event.detail;
    //   window.console.log('accountId ' + this.accountId);
    // }
    updateAccount(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.accountId;
        fields[NAME.fieldApiName] = this.template.querySelector("[data-field='Name']").value;
        fields[TARGET_REVENUE.fieldApiName] = this.template.querySelector("[data-field='Full_Year_Target_Revenue__c']").value;
        fields[Financial_Year.fieldApiName] = this.template.querySelector("[data-field='Financial_Year__c']").value;
        fields[Campaign_Budget.fieldApiName] = this.template.querySelector("[data-field='Campaign_Budget__c']").value;

        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Updated',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            console.log(error);
        });
    }
}