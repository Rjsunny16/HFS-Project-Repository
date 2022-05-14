public with sharing class AccountUtility {
    public AccountUtility() {

    }
    public static void viewAnnualRevenue(){
        List<Account> accountsList = new List<Account>();
        accountsList = [Select Name, AnnualRevenue From Account];
        for ( Account ac : accountsList){
            String acctRev = ac.Name + ' : ' + ac.AnnualRevenue;
            System.debug(acctRev); 
        }
    }
}
