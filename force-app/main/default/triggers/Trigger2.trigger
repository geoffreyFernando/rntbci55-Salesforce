trigger Trigger2 on Opportunity (before insert) {
    for(Opportunity opp : Trigger.New){
        
        if( opp.StageName =='Closed Won' && opp.CloseDate < System.Today().addDays(30)){
            opp.CloseDate.addError('Close Date need to be greater than 30 days');
        }
    }
}