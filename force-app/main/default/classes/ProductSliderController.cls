public with sharing class ProductSliderController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList() {
            return [SELECT Id, Name, Product_Image__c From Product2 ];
    }
}