@isTest
class AccountRelatedObjTest {
	 static testMethod void testAccountList () {
        Account acnt = new Account(Name = 'Micrisoft', Phone ='8762348732');
        insert acnt;
        
        Opportunity opp = new Opportunity(Name = 'Rochak-Electric Vehicle', AccountId = acnt.Id,
                                CloseDate = Date.today().addMonths(1), StageName = 'New');
        insert opp;
        
        Contact cont = new Contact(FirstName='Sitesh', LastName = 'Jha', Phone ='8762348732',AccountId = acnt.Id);
        insert cont;
        
        Case cs = new Case(Status = 'New', Origin = 'Email', AccountId = acnt.Id);
        insert cs;
    
        AccountRelatedObj.fetchAccount();
        AccountRelatedObj.fetchOpportunity( acnt.Id );
        AccountRelatedObj.getContacts( acnt.Id );
        AccountRelatedObj.fetchCase( acnt.Id );
        AccountRelatedObj.countOpp( acnt.Id );
        AccountRelatedObj.countClosedWonOpp( acnt.Id );
        AccountRelatedObj.getOpportunities( acnt.Id );
        AccountRelatedObj.countContacts( acnt.Id );
        AccountRelatedObj.countCases( acnt.Id );
        AccountRelatedObj.getClosedWonOpp( acnt.Id );
        AccountRelatedObj.getClosedLostOpp( acnt.Id );
        AccountRelatedObj.getAmountClosedWonOpp( acnt.Id );
        
    }
    @isTest(seeAllData=true)
    static  void validateTriggerPriceBook() {
        Account ac = new Account();
        ac.Name='Marlabs';
        insert ac;
        Pricebook2 pb = new Pricebook2();
        pb.Name = 'Standard PriceBook';
        pb.IsActive = true;
        insert pb;
        Opportunity opp = new Opportunity(Name = 'Rochak-Electric Vehicle', AccountId = ac.Id,
        CloseDate = Date.today().addMonths(1), StageName = 'New');
        
        insert opp;   
        Opportunity   op = [SELECT Id,Pricebook2Id FROM Opportunity WHERE Id=:opp.Id];
        Pricebook2 pb1 = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        //System.assertEquals(pb1.Id, op.Pricebook2Id, 'It is showing Error');
    }
}