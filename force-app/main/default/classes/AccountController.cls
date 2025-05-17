public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountById(Id accountId) {
        return [SELECT Id, Name, Industry FROM Account WHERE Id = :accountId LIMIT 1];
    }
}
