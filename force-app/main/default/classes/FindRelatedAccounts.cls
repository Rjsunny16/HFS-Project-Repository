public with sharing class FindRelatedAccounts {
    public static List<Account> findLocation(String rcordId){
        return [Select Name, Id, BillingStreet, BillingCity, BillingState From Account Where ParentId = :recordId];
    }
}
