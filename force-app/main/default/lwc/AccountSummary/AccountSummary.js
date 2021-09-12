import { LightningElement, track} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
import fetchOpportunity from '@salesforce/apex/AccountRelatedObj.fetchOpportunity';
import fetchCase from '@salesforce/apex/AccountRelatedObj.fetchCase';
import getClosedWonOpp from '@salesforce/apex/AccountRelatedObj.getClosedWonOpp';
import getClosedLostOpp from '@salesforce/apex/AccountRelatedObj.getClosedLostOpp';
import getAmountClosedWonOpp from '@salesforce/apex/AccountRelatedObj.getAmountClosedWonOpp';
import countContacts from '@salesforce/apex/AccountRelatedObj.countContacts';
import countClosedWonOpp from '@salesforce/apex/AccountRelatedObj.countClosedWonOpp';
import countCases from '@salesforce/apex/AccountRelatedObj.countCases';
import countOpp from '@salesforce/apex/AccountRelatedObj.countOpp';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Account.Id';
import TARGET_REVENUE from '@salesforce/schema/Account.Full_Year_Target_Revenue__c';
import Financial_Year from '@salesforce/schema/Account.Financial_Year__c';
import Campaign_Budget from '@salesforce/schema/Account.Campaign_Budget__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class AccountSummary extends LightningElement {
    
  
    updateAccount(){
      const fields = {};
      fields[ID_FIELD.fieldApiName] = this.msg;
      fields[Financial_Year.fieldApiName] = this.template.querySelector("[data-field='Financial_Year__c']").value;
      fields[TARGET_REVENUE.fieldApiName] = this.template.querySelector("[data-field='Full_Year_Target_Revenue__c']").value;
      fields[Campaign_Budget.fieldApiName] = this.template.querySelector("[data-field='Campaign_Budget__c']").value;
      console.log(fields);

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
    connectedCallback(){
                        fetchAccount()
                        .then(result => {
                                        this.acc = result;

                                        console.log(JSON.stringify(result));
                                        console.log("result",this.acc);
                                        })

                        }

   
    contactFetch(event){
                            this.message = event.target.value;
                            console.log('Contact Id-->'+this.message);
                            fetchContact({accountId : this.message})

                            .then(result => {
                                                this.con = result;

                                                console.log(JSON.stringify(result));
                                                console.log("result1",this.con);
                                            })
                            .catch(error =>{
                            this.error = error;

                                            })
                            this.message = event.target.value;
                            console.log('Contact Id-->'+this.message);
                            countContacts({accountId : this.message})

                            .then(result => {
                                                this.cnt = result;

                                                console.log(JSON.stringify(result));
                                                console.log("result1",this.cnt);
                                            })
                            .catch(error =>{
                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('Oppoertunity Id-->'+this.msg);
                            fetchOpportunity({accountId : this.msg})
                            .then(result => {
                                              this.opp = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result2",this.opp);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('Oppoertunity Id-->'+this.msg);
                            countOpp({accountId : this.msg})
                            .then(result => {
                                              this.cntopp = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result2",this.cntopp);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('opp Id-->'+this.msg);
                            countClosedWonOpp({accountId : this.msg})
                            .then(result => {
                                              this.cntcwopp = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result",this.cntcwopp);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('Case Id-->'+this.msg);
                            fetchCase({accountId : this.msg})
                            .then(result => {
                                              this.cs = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result2",this.cs);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('Case Id-->'+this.msg);
                            countCases({accountId : this.msg})
                            .then(result => {
                                              this.cntcs = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result",this.cntcs);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg1 = event.target.value;
                            console.log('Opportunity Id-->'+this.msg1);
                            getClosedWonOpp({accountId : this.msg1})
                            .then(result => {
                                              this.closedwonofopp = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result3",this.closedwonofopp);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg2 = event.target.value;
                            console.log('Opportunity Id-->'+this.msg2);
                            getClosedLostOpp({accountId : this.msg2})
                            .then(result => {
                                              this.closedlostopp = result;

                                              console.log(JSON.stringify(result));
                                              console.log("result4",this.closedlostopp);
                                            })
                            .catch(error =>{
                                            this.error = error;

                                            })
                            this.msg = event.target.value;
                            console.log('Opportunity Id-->'+this.msg);
                            getAmountClosedWonOpp({accountId : this.msg})
                            .then(result => {
                                             this.amountClosedWonOpp = result;
                                             console.log(JSON.stringify(result));
                                              console.log("result",this.amountClosedWonOpp);
                                              })
                              .catch(error =>{
                                              this.error = error;
                
                                             })                           
                        }
}