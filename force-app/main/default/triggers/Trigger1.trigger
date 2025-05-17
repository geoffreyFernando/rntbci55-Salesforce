trigger Trigger1 on Task (after Update, after insert) {
	
            List <Account> accounts = new List<Account>();
    for(Task tsk : Trigger.New){
        Set<Id> taskId = new Set<Id>();
        
        taskId.add(tsk.WhatId);
        
        Account acc = [Select Id, Last_Activity_Date__c from Account WHere Id =: taskId];
        if(tsk.WhatId !=null && tsk.Status =='Completed' && tsk.WhatId.getSObjectType() == Account.sObjectType){
        	acc.Last_Activity_Date__c = System.today();
            
            System.debug('tsk.WhatId.getSObjectType() ::'+ tsk.WhatId.getSObjectType());
        }
        accounts.add(acc);
    }
	update accounts;
}