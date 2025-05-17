import { LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { loadStyle } from 'lightning/platformResourceLoader';
import MY_CSS from '@salesforce/resourceUrl/myCustomStyles';

import userId from '@salesforce/user/Id'
import USER_NAME from '@salesforce/schema/User.Name'

export default class TechNSight extends NavigationMixin(LightningElement) {
    connectedCallback() {
        console.log('window.location.href',window.location.href);
    }

    clickForArray(){   
        const row = {};
        
        row['system'] = 'System 1';
        row['vin'] = 'JKGHBDXCAGH1234';
        row['account'] = 12345;

        console.log('row: ', JSON.stringify(row));
        return row;
    }

    handleEmailClick() {
    var pageRef = {
      type: "standard__quickAction",
      attributes: {
        apiName: "Global.SendEmail",
      },
      state: {
        recordId: "001NS000011A5uzYAC",
        defaultFieldValues: encodeDefaultFieldValues({
          HtmlBody: "Pre-populated text for the email body.",
          Subject: "Pre-populated Subject of the Email",
          ToAddresses: "geoffreygeo102@gmail.com",
        }),
      },
    };

    this[NavigationMixin.Navigate](pageRef);
    }

    handleCssClick(){
        loadStyle(this, MY_CSS + '/myCustomCSS.css') // 'styles.css' is inside the zipped resource
            .then(() => {
                console.log('Styles loaded successfully!');
            })
            .catch(error => {
                console.error('Error loading custom styles: ', error);
            });
    }

    connectedCallback(){
      console.log('UserId : ', userId);
      console.log('USER_NAME: ', USER_NAME);
    }
}