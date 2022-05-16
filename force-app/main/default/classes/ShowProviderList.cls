public with sharing class ShowProviderList {
    @AuraEnabled(cacheable=true)
    public static List<Account> providers(String searchKey){
        String s = '%'+searchKey +'%';
        return [SELECT Id, BillingCity, Name, BillingState, BillingCountry, Phone, PersonEmail, PersonGender FROM Account WHERE IsPersonAccount = true AND RecordTypeId = '0125j0000019btdAAA' AND (NAME LIKE :s OR BillingCity LIKE :s) ];
    
    }
}
