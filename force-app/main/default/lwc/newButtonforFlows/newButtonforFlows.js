import { LightningElement,track, api, wire} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import getAccount from'@salesforce/apex/GetPractionerId.getAccount';

export default class NewButtonforFlows extends LightningElement {
    
    @track isModalOpen = false;
    @api recordId;
    @track contct;
    @track isfile = false;
    @wire (getAccount,{accId: '$recordId'}) WireContactRecord({error, data}){
        if(data){
            this.contct = data;
            this.error = undefined;
            
        }else{
            this.error = error;
            this.contct= undefined;
           
        }
    }
    strName;
    strCertificateId;
    practionerId;
    boardCertificationId;
    
    handlesucess(event){
        boardCertificationId = event.detail.id;
        window.alert("certification Id", this.boardCertificationId);
    }
    
    nameChangedHandler(event){
        this.strName = event.target.value;
    }
    CertificateIdChangedHandler(event){
        this.strCertificateId = event.target.value;
    }
    closeModal() {
        this.isModalOpen = false;
        this.isfile = false;
    }
    openModal() {
        this.isModalOpen = true;
    }
    get acceptedFormats() {
        return ['.pdf', '.png'];
    }
    createCertificate() {
        
        
        
        window.alert("created");
        
        var fields = {'Name' : this.strName, 'Certificate_ID__c' : this.strCertificateId, 'AccountId__c' : this.recordId, 'ContactId__c' : this.contct.Id };
        
        var objRecordInput = {'apiName' : 'Board_Certification__c', fields};
        // LDS method to create record.
        createRecord(objRecordInput).then(response => {
            alert('Record is created with Id: ' +response.id);
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
        this.isModalOpen = false;
        // window.alert("board certification id ", boardCertificationId);
        this.isfile = true;
        
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
        this.isfile = false;
    }
}