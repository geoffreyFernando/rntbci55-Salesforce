trigger Trigger3 on Contact (after insert) {

    List<Case> caseList = new List<Case>();
    for(Contact con : Trigger.New){

        Case cas = new Case(Subject= 'New Contact Created',
                            Status= 'New',
                            Priority= 'Medium',
                            Contact_Creation_Date__c = System.Today(),
                            ContactId = con.Id);
        caseList.add(cas);
    }

    if(!caseList.isEmpty())
        insert caseList;
}
