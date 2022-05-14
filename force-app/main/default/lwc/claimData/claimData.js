import { api, LightningElement, track } from 'lwc';
 
import ClaimAction from '@salesforce/apex/Claimobj.claimAction';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
 
 
export default class insertRecordCustomObjectLwc extends NavigationMixin (LightningElement) {
 
    @track claimObName;
    @track claimRecoreId;
    @track errorMsg;
 
   claimHandleChange(event){
        if(event.target.name == 'PatientName'){
        this.claimObName = event.target.value;  
        //window.console.log('scoreObName ##' + this.scoreObName);
        }
      
 
 }
 
 submitAction(){
    ClaimAction({PatientName:this.claimObName})
    .then(result=>{
        this.claimRecoreId = result.Id;
        window.console.log('claimRecoreId##Vijay2 ' + this.claimRecoreId);       
        const toastEvent = new ShowToastEvent({
            title:'Success!',
            message:'Record created successfully',
            variant:'success'
          });
          this.dispatchEvent(toastEvent);
 
          /*Start Navigation*/
          this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.claimRecoreId,
                objectApiName: 'claim__c',
                actionName: 'view'
            },
         });
         /*End Navigation*/
 
    })
    .catch(error =>{
       this.errorMsg=error.message;
       window.console.log(this.error);
    });
 
 }
}