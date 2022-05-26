public with sharing class NpiVerificationForAllContacts {
    @InvocableMethod(label='Verify Npi' description='Return Npi verification status' category='Account' )
   public static void fetchAccount(List<String> accId)
   {
    String acc= accId.get(0);
    List<Account> accList = [Select Id FROM Account WHERE ParentId = :acc];
         List<Contact> conList = new List<Contact>();
         For(Account a : accList){
            List<Contact> cnt = [SELECT Id, NPI_Id__c, NPI_Status__c FROM Contact WHERE AccountId =:a.Id];
            conList.addAll(cnt);
         }
         For(Contact ct : conList){

             String result = NPIVerification.verifyNPI(ct.NPI_Id__c);
             If(result == '1'){
                ct.NPI_Status__c = 'Verified';
            }else{
                ct.NPI_Status__c = 'Not Verified';
            }
         }
         update conList;
   }
}
