public with sharing class AccountHandler {
    public AccountHandler() {

    }
    public static void insertAccount(Integer n){
        List<Account> addAccounts = new List<Account>();
        Integer i = 0;
        while(i<n){
            Account ac = new Account();
            ac.Name = 'Acme Inc ' + i;
            ac.AccountNumber = 'A000'+ i;
            addAccounts.add(ac);
            i++;
        }
        insert addAccounts;
    }
}
