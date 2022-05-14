public class ClaimObj {
        
    /*Using multiple parameter in apex  controller */
    @AuraEnabled
    public static claim__c claimAction(string PatientName){
        claim_c obj = new claim__c();
        obj.Patient_Name__c=PatientName;
       
 
        insert obj;
        return obj;
    }

}