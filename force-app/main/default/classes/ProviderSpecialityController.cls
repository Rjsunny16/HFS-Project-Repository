public class ProviderSpecialityController {
    
    @AuraEnabled(cacheable=true)
    public static List<HealthCare_Care_Specility__c> providerSpeciality(String searchKey){
        String s = '%'+searchKey +'%';
        return [SELECT Id, Name, PersonName__c,  ProviderCity__c, ProviderEmail__c, Provider_Phone__c, Specialty_Role__c FROM HealthCare_Care_Specility__c Where (NAME LIKE :s OR PersonName__c LIKE :s OR ProviderCity__c LIKE :s) ];
    
    }
}
