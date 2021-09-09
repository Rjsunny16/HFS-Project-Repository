import { LightningElement, track} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
import fetchOpportunity from '@salesforce/apex/AccountRelatedObj.fetchOpportunity';
import fetchCase from '@salesforce/apex/AccountRelatedObj.fetchCase';
import getClosedWonOpp from '@salesforce/apex/AccountRelatedObj.getClosedWonOpp';
import getClosedLostOpp from '@salesforce/apex/AccountRelatedObj.getClosedLostOpp';
import getAmountClosedWonOpp from '@salesforce/apex/AccountRelatedObj.getAmountClosedWonOpp';



// import { getRecord, getFieldValue } from "lightning/uiRecordApi";
// import Total_Opportunity from "@salesforce/schema/Account.Number_of_Opportunity__c";


// const fields = [Total_Opportunity];
export default class AccountSummary extends LightningElement {
    // @api
    // recordId;

    // // Wire the output of the out of the box method getRecord to the property account
    // @wire(getRecord, {
    //             recordId: "$recordId",
    //             fields
    //         })
    // account;
    @track acc;
    @track con;
    message;
    msg;
    @track opp;
    @track cs;
    @track closedwonofopp;
    @track closedlostopp;
    @track amountClosedWonOpp;
    connectedCallback(){
                        fetchAccount()
                        .then(result => {
                                        this.acc = result;

                                        console.log(JSON.stringify(result));
                                        console.log("result",this.acc);
                                        })

                        }

    // get total() {
    //         return getFieldValue(this.account.data, Total_Opportunity);
    // }
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