import { LightningElement, track, wire} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
import fetchOpportunity from '@salesforce/apex/AccountRelatedObj.fetchOpportunity';
import fetchCase from '@salesforce/apex/AccountRelatedObj.fetchCase';

const columns = [   {
                        label: 'First Name',
                        fieldName: 'FirstName'
                    },
                    {
                        label: 'Last Name',
                        fieldName: 'LastName'
                    },
                    {
                        label: 'Email',
                        fieldName: 'Email',
                        type: 'email'
                    },
                    {
                        label: 'Phone',
                        fieldName: 'phone',
                        type: 'phone'
                    }

                ];

const columnsOpp = [{
                        label: 'Name',
                        fieldName: 'Name'

                    },
                    {
                        label: 'Stage Name',
                        fieldName: 'StageName'
                    }

];
 

export default class AccountSummary extends LightningElement {
   
    @track acc;
    @track con;
    message;
    msg;
    @track opp;
    @track cs;
    @track columns = columns;
    @track columnsOpp = columnsOpp;
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