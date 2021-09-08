public class AccountRelatedObj {
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccount()
    {
        List<Account> accList=[SELECT Id,Name FROM Account ];
        return accList;
    }
    @auraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities( String accountId)
    {
        List<Opportunity> opp1List=[SELECT Amount,AccountId FROM Opportunity WHERE StageName = 'Closed Won' AND AccountId=:accountId ];
        return opp1List;
    }
    @auraEnabled
    public static List<Contact> getContacts(String accountId)
    {
        List<Contact> conList=[SELECT Id,FirstName,LastName,Name, Email, AccountId FROM Contact WHERE AccountId=:accountId ];
        return conList;
    }
    @auraEnabled
    public static List<Opportunity> fetchOpportunity(String accountId)
    {
        List<Opportunity> oppList=[SELECT Id,Name,StageName, AccountId FROM Opportunity WHERE AccountId=:accountId ];
        return oppList;
    }  
    @auraEnabled
    public static List<Case> fetchCase(String accountId)
    {
        List<Case> csList=[SELECT Id,CaseNumber,Status, AccountId FROM Case WHERE AccountId=:accountId ];
        return csList;
    } 
}