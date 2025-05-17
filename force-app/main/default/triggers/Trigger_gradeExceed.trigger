trigger Trigger_gradeExceed on CObject__c (after Update) {

    List<CObject__c> students = new List<CObject__c>();
    
    if(Trigger.isUpdate && Trigger.isAfter){
        for(CObject__c record : Trigger.New){
            //CObject__c record = Trigger.New.get(obj);
            if(record.grade__c > 12){
    			students.add(record);            
            }
        }
    }
    if(!students.isEmpty()){
        delete students;
    }
}