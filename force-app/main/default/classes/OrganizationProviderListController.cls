public with sharing class OrganizationProviderListController {
    @AuraEnabled(cacheable=true)
    public static List<Account> organizationProvider(String searchKey){
        String s = '%'+searchKey +'%';
        return [SELECT  Name, Id,HealthCloudGA__TaxId__c,Tax_Id_Status__c,	Business_License_Id__c,License_Id_Status__c, BillingStreet, BillingCity, BillingState, Phone FROM Account WHERE RecordTypeId = '0125j000000EQECAA4' AND (NAME LIKE :s OR BillingCity LIKE :s) ];
    
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> findPersonAcc(String recordId){
        return [Select Name, Id, MailingStreet, MailingCity,NPI_Id__c,	NPI_Status__c, MailingState, Speciality__c,Program__c From Contact Where AccountId = :recordId];
    }
}
