import { LightningElement , track , wire} from 'lwc';
import contactOfAcc from '@salesforce/apex/ContactDetails.contactOfAcc';

const column = [
    {label : 'Name' , fieldName : 'Name'},
    {label : 'Title' , fieldName : 'Title'},
    {label : 'Email' , fieldName : 'Email'},
    {label : 'Phone' , fieldName : 'Phone'}
];

export default class AccountLightningPage extends LightningElement {
    @track columns = column ;
    @track tableData = [];
    @track countItem = 0;
    recordId ;
    listURL
    baseURL = window.location.origin;
    AccURL  = this.baseURL + '/lightning/o/Account/list?filterName=Recent';
    // listURL = this.baseURL + '/lightning/r/Account/'+this.recordId+'/related/Contacts/view';
   
    
    

    connectedCallback(){
        console.log('Id : '+this.recordId); 
        const params = new URLSearchParams(window.location.search);
        this.recordId = params.get('c__recordId');
        setTimeout(() => {
            this.handleURLGeneration();
        }, 1000);
    }

    handleURLGeneration() {
        if (this.baseURL && this.recordId) {
            this.listURL = this.baseURL + '/lightning/r/Account/' + this.recordId + '/view';
            console.log('Custom URL: ', customURL);
        }
    }


    @wire(contactOfAcc , { recordId: '$recordId' })
    resFun({data , error}){
        if(data){
            //console.log(generateCustomURL());
            console.log('data : '+JSON.stringify(data));
            this.tableData = data;
            this.countItem = this.tableData.length;
        }
        else if(error){
            console.log('error occured');
        }
    }
    
    // AccURL  = this.baseURL + '/lightning/o/Account/list?filterName=Recent';
    // listURL = this.baseURL + '/lightning/r/Account/'+this.recordId+'/related/Contacts/view';
    
}