public with sharing class FindRelatedAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> findLocation(String recordId){
        return [Select Name, Id, BillingStreet, BillingCity, BillingState From Account Where ParentId = :recordId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> findPersonAcc(String recordId){
        System.debug(recordId);
        return [Select Name, Id, BillingStreet, BillingCity, BillingState From Account Where ParentId = :recordId];
    }
}
