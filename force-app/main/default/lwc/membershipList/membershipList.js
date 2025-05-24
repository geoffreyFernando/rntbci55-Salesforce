import { LightningElement, wire, track, api } from 'lwc';
import fetchaccount from '@salesforce/apex/membership_getDetails.membership_getDetails'
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import { deleteRecord, getRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex'

import retrieveAccountObjectData from '@salesforce/apex/retrieveAccountObjectData.retrieveAccount'

import { getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry"

import getContact from '@salesforce/apex/ImperativeClass.getContact';
import ImperativeClass from '@salesforce/apex/ImperativeClass.imperativeMethod';



// import {sObjectValue} from '@salesforce/apex'
import NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

import getContacts from '@salesforce/apex/LWCDataTableSortingExample.getContacts';

import { getObjectInfo } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

import templateOne from "./templateOne.html"
import templateTwo from "./membershipList.html"

import CONTACT_LastName_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_FirstName_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_Email_FIELD from '@salesforce/schema/Contact.Email';
import Name from '@salesforce/schema/Contact.Name';
import Id from '@salesforce/schema/Contact.Id';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

import {updateRecord} from "lightning/uiRecordApi"
const FIELDS = [
    'Contact.Name',
    'Contact.Email',
    'Contact.Phone'
];


const columns = [ { label: 'FirstName', fieldName: 'FirstName', sortable: "true"},
                  { label: 'LastName', fieldName: 'LastName'},
                  { label: 'Phone', fieldName: 'Phone', type: 'phone'},
                  { label: 'Email', fieldName: 'Email', type: 'email' },];


export default class MembershipList extends LightningElement {

    industryOptions;

    constructor() {
        super(); // call LightningElement class constructor console.log('Parent Constructor Called');
        let con = this.template //access host element
        console.log('Constructor : ',con);
    }
    connectedCallback(){
        console.log('Parent Connected Call Back called');
        let cb = this.template
        console.log('is connected=> ' + cb.isConnected);
    }

    isRendered = true // to check component is rendered
    renderedCallback() {
        if (this.isRendered) {
        console.log('Parent Rendered call Back called');
        this.isRendered = false
        }
    }
    //Above one explanation -> when LWC Runs the very first time data will be undefined Then it will log the data.. Constructor & Connected Callback is called when data=undefned time itself.. But rendered callback calls after all the undefined data's loaded then it's called Now if you see all values will be loggeed in console
    handleMemberSearch(event){
        const name = event.target.value;
        console.log('name :: ', name);
        
    }

    name = 'Bsker'

    columns1 =[
        {label : 'Name', fieldName : 'Name',
            type: 'button',
            typeAttributes: { 
                label: { fieldName: 'Name' },
                // name: 'view_profile', 
                variant: 'base'
            }
        },
        {label : 'Id', fieldName : 'Id'},
        {label : 'Number', fieldName : 'AccountNumber'},
    ]


    messge = false;
    
    handleMessage(){
        this.messge = true;
    }
    
    // connectedCallback(){
    //     this.addEventListener('refreshdatatable', this.handleEventMessage);
    // }
    handleEventMessage(){
          this.messge = true;
    }


    displaymssg2 = false;
    selectionHandler(event){
        console.log('event: ', event.target.checked);
        
        if(event.target.checked)
            this.displaymssg2 = true;
        else
        this.displaymssg2 = false;
    }

    get getMessage(){
        return 'Hi from Method'
    }

    // -----
    fields = [ACCOUNT_NAME, ACCOUNT_PHONE];
    
    handleSuccess(event){
        console.log('record creating Account : ', event);
        const showToast = new ShowToastEvent({
            title : 'Successfully created a Record',
            message : 'Account created int the Name of : '+event.detail.fields.Name.value,
            variant : "success"        
            })
        this.dispatchEvent(showToast)

     refreshApex(this.wiredAccountresult);
    }

    // --------
    onDelete(){
        const deletionRecordId = this.template.querySelector('.inp1').value;
        console.log('deletionRecordId : ',deletionRecordId );
        deleteRecord(deletionRecordId);
    }

// ------------
// Rsource : https://www.salesforcebolt.com/2021/05/how-to-delete-records-in-lwc.html
// YT - https://www.youtube.com/watch?v=q-S3gv2v1jM&list=PL1qNeQdVTMhF51iyP2Ieky5-B-zG1_YTl&index=8
    accounts;
    wiredAccountresult;

    @wire(retrieveAccountObjectData)
    accountData(result){
        console.log('Result for RefreshApex : ', result);
        this.wiredAccountresult = result;
        const {error, data} = result;
        this.accounts = data;
        console.log('OUTPUT : ', this.accounts);
    }
    deleteAccountRecord(event){
        const recordId = event.target.dataset.id;
        console.log('data-Id : ',event.target.dataset.id);
        // dataset = Use to select(retrieve) particular Id when a button or event is clicked
        // data-id / data-recordId -> event.target.dataset.id, event.target.dataset.recordId (What you name in html need to use in js) 

        deleteRecord(recordId)
        .then(()=>{
            this.dispatchEvent(new ShowToastEvent({
                title:'Successfully Deleted',
                message :'Record deleted',
                variant:'success'
            }))
            refreshApex(this.wiredAccountresult);
        })
        .catch((error)=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Error',
                    message : 'Error Deleting record',
                    variant : 'error'
                })
            );
        });
        console.log('this.wiredAccountresult', this.wiredAccountresult);
    }

    industry=[];

@wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: ACCOUNT_INDUSTRY })
accInd({ data, error }) {
    if (data) {
        // console.log('data : ', data);
        // console.log('data.values : ', data.values); 
        this.industry = data.values;
        // console.log('this.industry : ', this.industry);
    }
    if (error) {
        console.log('error : ', error);
    }
}

    picklistValue = false;
    showPicklist() {
        this.picklistValue = !this.picklistValue; // Toggle the value
    }
    showPicklistFalse(){
        this.picklistValue = false
    }
    handleSelect(event) {
        const selectedItem = event.target.innerText;
        this.selectedIndustry = selectedItem;
        console.log('Selected Industry:', this.selectedIndustry);
    }

    clickedPicklist(event){
        const val = event.target.value;
        
        console.log('clickedPicklist',event.target.value);
        console.log('clickedPicklist',event.target.checked);
        const selectedVal = this.industry.find(option => option.value === val);

        console.log('selectedVal ', selectedVal);
        
        this.industry.forEach(ind => ind.checked = false);
        if (selectedVal) {
            selectedVal.checked = event.target.checked;
        }
        console.log('selectedVal ', selectedVal);
        
    }

    // Imperative method
    contactList = []
    
    searchContact(){
        console.log('##Inside searchContact##');
        
        const value = this.template.querySelector('.c-contact-list').value;
        // console.log('value :: ', value);
        
        ImperativeClass({Name : value})
        .then(result => {
            this.contactList = result;
            // console.log('result : ', result);
        })
        .catch(error => {
            console.error('Error retrieving contact:', error);
        });
    }

    // getSObjectValue :
    @wire(getContact)
    gettingContact;


    get nameSObjectValue() {
        const contact = this.gettingContact.data ? this.gettingContact.data[0] : null;
        console.log('NameVal:', contact ? contact.LastName : '');  // Logs the LastName field
        return contact ? contact.LastName : '';  // Access LastName directly from the contact record
    }

    // Getter for Email
    get emailSObjectValue() {
        const contact = this.gettingContact.data ? this.gettingContact.data[0] : null;
        return contact ? contact.Email : '';  // Access Email directly from the contact record
    }

    // Sorting

     @track data;
    @track columns = columns;
    @track sortBy;
    @track sortDirection;
 
    @wire(getContacts)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    doSorting(event) {
        debugger;
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        debugger;
        let parseData = JSON.parse(JSON.stringify(this.data));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.data = parseData;
    }    


    //Parent to Child 
    childToParent = 'Geoffrey From parent';

    //getFieldValue
    @wire(getRecord, {recordId:'001NS000011A5uzYAC', fields : ACCOUNT_NAME})
    accountValue;

    get accountName(){
        return getFieldValue(this.accountValue.data, ACCOUNT_NAME);
    }
    percentage = 20;
    handleChangeColor(event){
        this.percentage = event.target.value;
    }
    get style(){
        return `background-color:red ; width:${this.percentage}%; height:10px`
    }

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: INDUSTRY_FIELD })
    propertyOrFunction({data, error}){
        if(data){
            console.log('Industry Options data : ', data);
            this.industryOptions = data.values;
        }
    }

    // Pagination

    currentPage =1;
    recordSize =5;
    totalRecords; 
    totalPages=1;

    accountsData=[]
    allAccountsData=[]

    @wire(fetchaccount)
    mtd({data, error}){

        console.log('accountsData :', data);
        if(data){
            
            this.allAccountsData = [...data];
            console.log('allAccountsData :: ' +this.allAccountsData);
            const trec = this.allAccountsData.length;
            this.totalPages = Math.ceil( trec / this.recordSize);

            console.log('this.trec : ', trec);
            console.log('this.totalPages : ', this.totalPages);
            // this.generateList(totalPages);
            this.displayRecordsPerPage();
            this.generatePageList(this.totalPages);
        }
    }

    handleFirst(){
        if(this.currentPage>1){
            this.currentPage = 1
            console.log('this.currentPage : ', this.currentPage);
            this.displayRecordsPerPage();
        }
    }

    handlePrevious(){
         if(this.currentPage>1){
            this.currentPage = this.currentPage-1
            this.displayRecordsPerPage()
        }
    }
    handleNext(){
        console.log('## Inside handleNext ##');
        console.log('total Pages :' , this.totalPages);
        if(this.currentPage < this.totalPages){
            this.currentPage = this.currentPage+1
            console.log('this.currentPage : ', this.currentPage);
            this.displayRecordsPerPage();
        }
    }
    handleLast(){
        console.log('## Inside handleLast ##');
        if (this.currentPage < this.totalPages) {
            this.currentPage = this.totalPages;
            console.log('Navigated to Last Page:', this.currentPage);
            this.displayRecordsPerPage();
        }
    }

    generatePageList(num){
        console.log('## num generate pagelist: ', num);

    }
    displayRecordsPerPage(){ 
        console.log('## Inside displayRecordsPerPage ##');
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.accountsData = this.allAccountsData.slice(start, end);
        console.log(' start :', start);
        console.log('end : ', end);
        console.log('displayRecordPerPage : ', this.accountsData);
    }


    // ----------------------------

    greeting = {fname: 'Geoffrey', lname:'Basker'};//1
    // @track greeting = {fname: 'Geoffrey', lname:'Basker'};
    arrayofValues = ['Apple', 'orange'];

    handleGreeting(){
        // this.greeting.fname = 'Biju'
        this.greeting = {fname: 'Biju', lname:'prathap'}//1
    }
    handleArrayOfValues(){
        this.arrayofValues.push('Banana');
    }

    @track metaValue;
    metadataResult;
    errorMessage;

    handleMetadata(event){
        console.log('## Inside handleMetada ##');
        this.metaValue = this.template.querySelector('.metadatavalue').value;
        console.log('metaValue : ',this.metaValue);
        if(event.error){
            console.log('event.error : ', error);
        }
        if(this.metaValue){
            console.log('this.metaValue error : ', this.metaValue);
        }
    }

    @wire(getObjectInfo, { objectApiName: '$metaValue' })
        propertyOrFunction(result){
            console.log('getObjectInfo result:', result);
            const {data, error} = result
        if (data) {
            this.metadataResult = JSON.stringify(data, null, 2);
            this.errorMessage = null; // Clear previous errors
            console.log('getObjectInfo Success:', this.metadataResult);
        } else if (error) {
            console.log('getObjectInfo Error:', error);

           if (error.body && error.body.message) {
                this.errorMessage = error.body.message;
            } else if (error.message) {
                this.errorMessage = error.message; // Handles "adapter-unfulfilled-error"
            } else {
                this.errorMessage = 'An unexpected error occurred.';
            }

            this.metadataResult = null; // Clear previous data
        }
    };

    handleRotate(){
        this.template.querySelector(".myDIV").style.msTransform = "rotate(20deg)"; 
    }

    inp1Value;
    inp1(event){
        this.inp1Value = event.target.value; 
        console.log(event.target.value);
    }

    async getCon(){
        try{
            const data = await getContact();
            console.log('Imperative call :: '+ JSON.stringify(data));
        }catch(error){
            console.log('Imperative error : ',error);
        }
    }
    connectedCallback(){
        this.getCon();
    }

    renderFlag = false;
    renderFunction(){
        this.renderFlag = !this.renderFlag;
    }
    render(){
        return this.renderFlag? templateOne :templateTwo;
    }
    objectApiName = CONTACT_OBJECT
    fields = [CONTACT_Email_FIELD, CONTACT_FirstName_FIELD, CONTACT_LastName_FIELD];
    handleSuccess(event) {}

    @api greetingS

    // LDS

    updateAccountRecord() {
        const fields = {}

            fields[Id.fieldApiName]= '003NS00000PKSPxYAP', // Replace with a valid record ID
            fields[CONTACT_FirstName_FIELD.fieldApiName]= 'New Account Name'
        // const fields = {
        //     [Id.fieldApiName]: '003NS00000PKSPxYAP', // Replace with a valid record ID
        //     [CONTACT_FirstName_FIELD.fieldApiName]: 'New Account Name'
        // };
        const recordInput = {fields };

        updateRecord(recordInput)
            .then(() => {
                // Success toast or message
                console.log('Success: Record updated');
            })
            .catch(error => {
                // Handle error
                console.error('Error updating record:', error);
            });
    }
    
    @wire(getRecord, {recordId : '003NS00000PKSPxYAP', fields: [CONTACT_Email_FIELD, CONTACT_FirstName_FIELD]})
    getRec(data){
        console.log('getRecord: ', data);
    }
    createAccountRecord() {
    const fields = {}

        // fields[Id.fieldApiName]= '003NS00000PKSPxYAP' // Replace with a valid record ID
        fields[Name.fieldApiName]= 'New Account Name 1'
    // const fields = {
    //     [Id.fieldApiName]: '003NS00000PKSPxYAP', // Replace with a valid record ID
    //     [CONTACT_FirstName_FIELD.fieldApiName]: 'New Account Name'
    // };
    const recordInput = {
        apiName: ACCOUNT_OBJECT.objectApiName,
        fields };

    createRecord(recordInput)
        .then(() => {
            // Success toast or message
            console.log('Success: Record created');
        })
        .catch(error => {
            // Handle error
            console.error('Error creating record:', error);
        });
    }
    
    @wire(getRecord, {recordId : '003NS00000PKSPxYAP', fields: [CONTACT_Email_FIELD, CONTACT_FirstName_FIELD]})
    getRec(data){
        console.log('getRecord: ', data);
    }
    connectedCallback(){
        this.updateAccountRecord()
        // this.createAccountRecord()

        const endPoint = 'https://rntbci55-dev-ed.develop.lightning.force.com/services/data/v60.0/sObjects/Account/query?q=SELECT+Id+Name+FROM+Account'
        fetch(endPoint,
            {
                method :'GET',
                headers :{
                    'Authorization':'00DNS000009u8vN!AQEAQI2HyY.szXgM6BgIaMy_PTnVW5Xav5zxE6BF5bl86DdFHQOgcKSCwwNAYKHelstM6LTWsuQL7oUYtRpLxqrIuap9Mfr4'
                }    
            }
        )
        .then((resp) => resp.json())
        .then((resp) => console.log('from API resposne: ', resp));
    }
    
    localName;
    localGreeting;
    chSlot(){

    this.localName = 'Switzerland';
    this.localGreeting = 'Swiss';
    }

    connectedCallback(){

    }
    async componentLoad(){
        // const comp = await import('./templateOne.html');
        this.template.getElementByClass('.containerComponent').appendChild(comp);
    }
}
