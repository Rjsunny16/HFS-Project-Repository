public with sharing  class ContactsliderController {
@AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Integer limitVal)
    {
        return [SELECT Id,Name,Phone From Contact LIMIT:limitVal];
    }
}