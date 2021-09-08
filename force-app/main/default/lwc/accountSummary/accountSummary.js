import { LightningElement, track} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
import fetchOpportunity from '@salesforce/apex/AccountRelatedObj.fetchOpportunity';
import fetchCase from '@salesforce/apex/AccountRelatedObj.fetchCase';
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
                        }
}