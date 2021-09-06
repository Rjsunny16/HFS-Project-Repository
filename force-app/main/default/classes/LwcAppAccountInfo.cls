public with sharing class LwcAppAccountInfo {
   
 
    //Display the Contacts based on AccountId the help of event in LWc
    @AuraEnabled(cacheable=true)
    public static List<Account> retrieveAccountRecords(){
        List<Account> accList = [Select Id, Name, Phone, Industry, Description From Account Where Phone != null limit 6];
        return accList;
    }
 
 
    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContactRecords(string accId){
      List<Contact> conObj = new  List<Contact>();
      List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone, AccountId From Contact Where AccountId=:accId];
      for(Contact con:conList){
        conObj.add(con);
      }
      return conObj;
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> retrieveOpportunityRecords(string accId){
      List<Opportunity> oppObj = new  List<Opportunity>();
      List<Opportunity> oppList = [Select Id, Name,  StageName, CloseDate, Amount, AccountId From Opportunity Where AccountId=:accId];
      for(Opportunity opp:oppList){
        oppObj.add(opp);
      }
      return oppObj;
    }
}