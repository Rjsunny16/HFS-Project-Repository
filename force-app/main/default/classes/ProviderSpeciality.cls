public with sharing class ProviderSpeciality {
    @AuraEnabled(cacheable=true)
    public static List<HealthCare_Care_Specility__c> getProviderSpeciality(
        String personName,
        String specialityRole,
        String providerCity
        //String providerEmail
        //String providerPhone
    ){
        String query;
        String condition = (String.isNotBlank(personName) ? 'PersonName__c  LIKE \'' + '%' + personName + '%\'' : '');

        condition += (String.isNotBlank(specialityRole)
            ? (String.isNotBlank(condition) ? +' AND ' : '') + ' Specialty_Role__c LIKE \'' + '%' + specialityRole + '%\'' : '');

        condition += (String.isNotBlank(providerCity)
            ? (String.isNotBlank(condition) ? +' AND ' : '') + ' ProviderCity__c LIKE \'' + '%' + providerCity + '%\'' : '');

        // condition += (String.isNotBlank(providerEmail)
        //     ? (String.isNotBlank(condition) ? +' AND ' : '') + ' ProviderEmail__c LIKE \'' + '%' + email + '%\'' : '');

        // condition += (String.isNotBlank(providerPhone)
        //     ? (String.isNotBlank(condition) ? +' AND ' : '') + ' Provider_Phone__c LIKE \'' + '%' + phone + '%\'' : '');

        System.debug('condition ' + condition);
        if (String.isNotBlank(condition)) {
            query =
                'SELECT Name,PersonName__c,ProviderCity__c,Specialty_Role__c FROM HealthCare_Care_Specility__c WHERE ' +
                 condition +
                ' ORDER BY PersonName__c';
        } else {
                query = 'SELECT Name,PersonName__c,ProviderCity__c,Specialty_Role__c FROM HealthCare_Care_Specility__c ORDER BY PersonName__c LIMIT 200 ' ;
               }
    
            List<HealthCare_Care_Specility__c> records = Database.query(query);
            return records;
    }
    
}