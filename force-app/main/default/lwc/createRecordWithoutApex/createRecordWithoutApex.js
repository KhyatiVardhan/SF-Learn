import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import ACC_NAME from '@salesforce/schema/Account.Name';

export default class CreateRecordWithoutApex extends LightningElement {
    accountId;
    name = '';
    handlenameChange(event){
        this.name = event.target.value;
        //console.log('name : '+JSON.stringify(this.name));
    }

    handleCreateAcc(){
        const fields = {};
        fields[ACC_NAME.fieldApiName] = this.name;                //storing the name of account in name input field
        console.log('fields : '+JSON.stringify(fields));

        const recordInput = {                     //here we are storing object api name and fields
            apiName : ACCOUNT_OBJ.objectApiName ,
            fields
        };

        createRecord(recordInput)
        .then(accountRes =>{
            console.log('Account Response : '+JSON.stringify(accountRes));

            this.accountId = accountRes.id;
        })
        .catch(error =>{
            console.log('Account error : '+JSON.stringify(error));
        })
    }
}