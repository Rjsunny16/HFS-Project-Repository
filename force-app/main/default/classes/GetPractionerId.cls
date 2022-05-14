public with sharing class GetPractionerId {
    @AuraEnabled(cacheable=true)
    public static Contact getAccount(String accId){
       Contact cont = [Select Id From Contact where AccountId= :accId];
       return cont;
   }
}
