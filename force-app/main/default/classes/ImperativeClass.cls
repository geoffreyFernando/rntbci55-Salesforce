public with sharing class ImperativeClass {

    @AuraEnabled(cacheable=true)
    public static List<Contact> imperativeMethod(String Name) {
        System.debug('Name: ' + Name);
        List<Contact> con = [Select Id, Name, Email, Phone from Contact where Name Like :('%'+ Name +'%')];
        return con;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact() {
        List<Contact> con = [Select Id, LastName, Email from Contact LIMIT 1];
        return con;
    }
}