trigger Trigger_NewMap on CObject__c (after update) {
    // Loop through Trigger.newMap to get the new records
    System.debug('keyset :: '+Trigger.newMap.keySet());
    SYstem.debug('newMap :: ' + Trigger.newMap);
    SYstem.debug('new :: ' + Trigger.new);
    SYstem.debug('Old  :: ' + Trigger.Old);
    
    for (Id accountId : Trigger.newMap.keySet()) {
        CObject__c newAcc = Trigger.newMap.get(accountId); // Get the new Account record
        CObject__c oldAcc = Trigger.oldMap.get(accountId); // Get the old Account record

        // Check if the Industry field has changed
        if (newAcc.Country__c != oldAcc.Country__c) {
            System.debug('Account Industry changed:');
            System.debug('Old Country__c: ' + oldAcc.Country__c);
            System.debug('New Country__c: ' + newAcc.Country__c);
        }
    }
}