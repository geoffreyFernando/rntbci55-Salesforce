import { LightningElement } from 'lwc';

export default class ParentCustomEventComponent extends LightningElement {
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
}