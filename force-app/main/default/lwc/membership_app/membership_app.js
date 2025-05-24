// import '@lwc/synthetic-shadow';
import { LightningElement, wire, track } from 'lwc';


export default class Membership_app extends LightningElement {
    @track selectedItem;

    handleItemSelected(event){
        console.log('from membership APP : ', event.detail.description);
        this.selectedItem = event.detail.description
    }
}