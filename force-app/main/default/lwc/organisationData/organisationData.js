import { LightningElement,api, track } from 'lwc';

import findLocation from '@salesforce/apex/FindRelatedAccounts.findLocation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SearchAllPolicies extends LightningElement {

    @track columns = [{
        label: 'Id',
        fieldName: 'Id'
        
    },
    {
        label: 'Name',
        fieldName: 'Name'
        
    },
    {
        label: 'Street',
        fieldName: 'BillingStreet'
    },
    {
        label: 'State',
        fieldName: 'BillingState'
    }

];


@track data;
@track error;
@track searchValue ='';

    searchKeyword(event) {
    this.searchValue = event.target.value;
    console.log(this.searchValue);
}

handleSearchKeyword(){
    if(this.searchedValue !== '') {
    getPoliciesList({
        searchKey: this.searchValue
            })
            .then(result=> {
                this.data = result;
                console.log(this.data);
            })
            .catch(error=> {
                //this.error = error;
            
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant :'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                console.log(data); 
                //reset the data var with null
                this.data = null;
            });
        
        }//end of if
        
        else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);  
        }

        }                                          
             
}