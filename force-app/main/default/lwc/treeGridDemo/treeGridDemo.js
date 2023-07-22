import { LightningElement , track} from 'lwc';
import getChildContact from '@salesforce/apex/getContactOppRecord.getChildContact';

export default class TreeGridDemo extends LightningElement {
    @track gridColumns = [
        {
            type : 'text',
            fieldName : 'Name',
            label : 'Name'
        },
        {
            type : 'text',
            fieldName : 'FirstName',
            label : 'First Name'
        },
        {
            type : 'text',
            fieldName : 'LastName',
            label : 'Last Name'
        }
    ];

    @track gridData;

    connectedCallback(){
        getChildContact()
        .then(res=>{
            // console.log('res : '+JSON.stringify(res));

            var tempCont = JSON.parse(JSON.stringify(res));
            // console.log('tempCont : '+JSON.stringify(tempCont));

            for(var i=0; i<tempCont.length ; i++){
                var newContact = tempCont[i]['Contacts'];
                // console.log('newContact : '+JSON.stringify(newContact));

                if(newContact){
                    tempCont[i]._children = newContact;
                    //console.log('tempCont[i]._children : '+JSON.stringify(tempCont[i]._children));
                    delete tempCont[i].Contacts;
                }
            }
            this.gridData = tempCont;
            console.log('this.gridData : '+JSON.stringify(this.gridData));
        })
        .catch(error=>{
            console.error(JSON.stringify(error));
        })
    }

    getSelectedRows(event){
        const selectedRows = event.detail.selectedRows;
    }
}