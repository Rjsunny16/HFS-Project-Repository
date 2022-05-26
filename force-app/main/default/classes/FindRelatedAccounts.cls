public with sharing class FindRelatedAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> findLocation(String recordId){
        return [Select Name, Id,HealthCloudGA__TaxId__c,Tax_Id_Status__c,	Business_License_Id__c,License_Id_Status__c, BillingStreet, BillingCity, BillingState From Account Where ParentId = :recordId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> findPersonAcc(String recordId){
        return [Select Name, Id, MailingStreet, MailingCity,NPI_Id__c,	NPI_Status__c, MailingState, Speciality__c,Program__c From Contact Where AccountId = :recordId];
    }
}
