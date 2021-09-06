@isTest
private class TestPriceBook {
    
    @isTest(seeAllData=true)
    static  void validateTriggerPriceBook() {
        Account ac = new Account();
        ac.Name='Marlabs';
        insert ac;
        Opportunity opp = new Opportunity(Name = 'Rochak-Electric Vehicle', AccountId = ac.Id,
        CloseDate = Date.today().addMonths(1), StageName = 'New');
        
        insert opp;
             
        Opportunity   op = [SELECT Id,Pricebook2Id FROM Opportunity WHERE Id=:opp.Id];
        System.assertEquals('01s2w000000F5kwAAC', op.Pricebook2Id);
    }
}