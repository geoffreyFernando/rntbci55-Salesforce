import { LightningElement, wire } from 'lwc';
import getContact from '@salesforce/apex/contactList_Demo1.contactList';

import getAccountById from "@salesforce/apex/AccountController.getAccountById";
import {getSObjectValue} from '@salesforce/apex';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class ContactList_1 extends LightningElement {
    contacts;
    error;
    name1;

    @wire(getContact, {name: '$name1'})
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
            console.log('Contact Data:', data);
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
            console.error('Error fetching contacts:', error);
        }
    }

    changeHandler(event){
        this.name1 = event.target.value;
        console.log('name : ', this.name1);
        
    }

    account;
    error;

    @wire(getAccountById, { accountId: '001NS00000sdrBxYAI' })
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
            this.error = undefined;
            console.log('account : ', this.account);
            
        } else if (error) {
            this.error = error;
            this.account = undefined;
        }
    }

    get accountName() {
        return this.account ? getSObjectValue(this.account, NAME_FIELD) : "";
    }

    get accountIndustry() {
        return this.account ? getSObjectValue(this.account, INDUSTRY_FIELD) : "";
    }
}