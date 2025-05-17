public with sharing class contactList_Demo1 {
    @AuraEnabled(cacheable=true)
    public static List<Contact> contactList(String name) {
        String key = '%'+ name +'%';
        String query = 'SELECT Id, Name from Contact where Name LIKE :key' ;
        return Database.query(query);
        // return [SELECT Id, Name from Contact where Name LIKE :key];
    }
}