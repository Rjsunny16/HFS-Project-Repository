@isTest
private class TestPriceBook {
    
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
        System.assertEquals(pb1.Id, op.Pricebook2Id, 'It is showing Error');
    }
}