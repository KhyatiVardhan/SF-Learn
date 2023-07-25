import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ButtonNav extends LightningElement {
    handleClickNav(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account',
                actionName : 'home'
            }
        })
    }
}