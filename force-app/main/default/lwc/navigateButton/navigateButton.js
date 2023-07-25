import { LightningElement , api, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigateButton extends NavigationMixin(LightningElement) {
    @api recordId ;

    handleClickNav(){    
        console.log('Id : '+this.recordId); 

        this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes : {
                apiName : 'Account_tab_lwc'
            },
            state : {
                c__recordId: this.recordId 
            }
        });


    }
}