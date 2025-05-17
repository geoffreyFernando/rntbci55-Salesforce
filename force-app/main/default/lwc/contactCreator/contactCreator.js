import { LightningElement } from 'lwc';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName'
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email'
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
const fields = [CONTACT_FIRSTNAME, CONTACT_LASTNAME, CONTACT_EMAIL];

export default class ContactCreator extends LightningElement {
    handleSuccess(event){
        const events = new ShowToastEvent({
            title: 'Success!',
            message: 'Record created!'+event.detail.Id, 
            variant : 'success'         
        });
        this.dispatchEvent(events);
    }
}