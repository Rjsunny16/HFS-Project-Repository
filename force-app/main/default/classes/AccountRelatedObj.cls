public class AccountRelatedObj {
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccount()
    {
        List<Account> accList=[SELECT Id,Name FROM Account ];
        return accList;
    }
    @auraEnabled
    public static List<Opportunity> fetchOpportunity(String accountId)
    {
        List<Opportunity> oppList=[SELECT Id,Name,StageName, AccountId FROM Opportunity WHERE AccountId=:accountId ];
        return oppList;
    }
    @auraEnabled
    public static List<AggregateResult> countOpp(String accountId)
    {
        List<AggregateResult> countop=[SELECT COUNT(Id) cntopp FROM Opportunity WHERE  AccountId=:accountId ];
        return countop;
    }
   
    @auraEnabled(cacheable=true)
    public static List<AggregateResult>  countClosedWonOpp( String accountId)
    {
        List<AggregateResult>  countCwOpp=[SELECT COUNT(Id) cntcwopp FROM Opportunity WHERE StageName = 'Closed Won' AND AccountId=:accountId ];
        return countCwOpp;
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
    public static List<AggregateResult> countContacts(String accountId)
    {
        List<AggregateResult> countcon=[SELECT COUNT(Id) cnt From Contact where  accountId=:accountId ];
        return countcon;
    }
    @auraEnabled
    public static List<AggregateResult> countCases(String accountId)
    {
        List<AggregateResult> countcs=[SELECT COUNT(Id) cntcs FROM Case WHERE  AccountId=:accountId ];
        return countcs;
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
        List<AggregateResult> oppList1=[SELECT COUNT(Id) Name, COUNT(StageName) FROM Opportunity WHERE StageName='Closed Won' AND  accountId=:accountId ];
        return oppList1;
    }
    
    @auraEnabled
    public static List<AggregateResult> getClosedLostOpp(String accountId)
    {
        List<AggregateResult> oppList2=[SELECT COUNT(Id) Name, COUNT(StageName) FROM Opportunity WHERE StageName='Closed Lost' AND  AccountId=:accountId ];
        return oppList2;
    }
    @auraEnabled
    public static List<Opportunity> getAmountClosedWonOpp(String accountId)
    {
        List<Opportunity> oppList3=[SELECT Id,Name,Amount,AccountId FROM Opportunity WHERE StageName='Closed Won' AND AccountId=:accountId ];
        return oppList3;
    }       
}