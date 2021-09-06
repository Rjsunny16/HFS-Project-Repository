public with sharing class LookupController {
    // @AuraEnabled
    public static List<Account> fetchAccounts(String searchString) {
        List<Account> accounts = new List<Account>();
        try{
            String keyStr = '';
            if(!String.isBlank(searchString)) {
                keyStr = searchString + '%';
            }
            accounts = [SELECT Id, Name
                        FROM Account
                        WHERE Name LIKE :keyStr
                        ORDER BY Name
                        LIMIT 10];
            return accounts;
        }catch(exception exc) {
            return accounts;
        }
    }
}