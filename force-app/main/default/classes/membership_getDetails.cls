public with sharing class membership_getDetails {
    @AuraEnabled
    public static List<Account> membership_getDetails() {
        List<Account> cc = [Select Id, name, AccountNumber from Account];
        return cc;
    }
}