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
    @auraEnabled
    public static List<AggregateResult> getClosedWonOpp(String accountId)
    {
        List<AggregateResult> oppList1=[SELECT COUNT(Id) Name, COUNT(StageName) From Opportunity where StageName='Closed Won' and accountId=:accountId ];
        return oppList1;
        //[SELECT COUNT(Id) Name, COUNT(StageName) From Opportunity where StageName='Closed Won' and accountId=:accountId];
    }
    @auraEnabled
    public static List<AggregateResult> getClosedLostOpp(String accountId)
    {
        List<AggregateResult> oppList2=[SELECT COUNT(Id) Name, COUNT(StageName) From Opportunity where StageName='Closed Lost' and accountId=:accountId ];
        return oppList2;
        //[SELECT COUNT(Id) Name, COUNT(StageName) From Opportunity where StageName='Closed Won' and accountId=:accountId];
    }
    @auraEnabled
    public static List<Opportunity> getAmountClosedWonOpp(String accountId)
    {
        List<Opportunity> oppList3=[SELECT Id,Name,Amount,AccountId FROM Opportunity where StageName='Closed Won' and accountId=:accountId ];
        return oppList3;
        //[SELECT COUNT(Id) Name, COUNT(StageName) From Opportunity where StageName='Closed Won' and accountId=:accountId];
    }       
}