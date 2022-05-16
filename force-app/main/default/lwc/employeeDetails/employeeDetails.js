import { LightningElement, api, wire, track } from 'lwc';
import EmployeeController from '@salesforce/apex/EmployeController.EmployeeController'
 
export default class EmployeeDetails extends LightningElement {
    @api recordId;
    @track projects__c;
    @track columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Project Start Date', fieldName: 'Project_Start_Date__c'},
        { label: 'Project End Date', fieldName: 'Project_End_Date__c'}
    ];
    @wire(EmployeeController, {employeeId: '$recordId'}) 
    WireProjectRecords({error, data}){
        if(data){
            this.projects__c = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.projects__c = undefined;
        }
    }
   
   
}