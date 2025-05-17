import { LightningElement, api } from 'lwc';

export default class ChildCustomEventComponent extends LightningElement {

    @api mydata;
    but(){
        let myCustomevent1 = new CustomEvent('closemodel')
        this.dispatchEvent(myCustomevent1);
    }
}