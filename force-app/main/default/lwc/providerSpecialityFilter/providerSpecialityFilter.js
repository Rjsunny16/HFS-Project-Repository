import { LightningElement, wire,track,api } from 'lwc';
import getProviderSpeciality from "@salesforce/apex/ProviderSpeciality.getProviderSpeciality";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ProviderSpecialityFilter extends NavigationMixin(LightningElement){
    @track data;
    searchable = [];
    wiredProviderCount;
    wiredProviders;

    doneTypingInterval = 0;
 

    searchAllValue;

    personName = "";
    specialityRole = "";
    providerCity = "";

    @wire(getProviderSpeciality, {
        personName: "$personName",
        specialityRole: "$specialityRole",
        providerCity: "$providerCity"
    })
    wiredSObjects(result) {
        console.log("wire getting called");
        this.wiredProviders = result;
        if (result.data) {
            this.searchable = this.data = result.data.map((providerObj, index) => ({
                providerData: { ...providerObj },
                index: index + 1,
                rowIndex: index
            }));
        } else if (result.error) {
            console.error("Error", error);
        }
    }

    handleChange(event) {
        this[event.target.name] = event.target.value;
        console.log("change", this[event.target.name]);
    }

    handleKeyUp(event) {
        clearTimeout(this.typingTimer);
        let value = event.target.value;
        let name = event.target.name;

        this.typingTimer = setTimeout(() => {
            this[name] = value;
        }, this.doneTypingInterval);
    }

    clearSearch() {
        this.personName = "";
        this.specialityRole = "";
        this.providerCity = "";
        this.searchable = this.data;
        this.searchAllValue = "";
        this.searchAll();
    }

    handleSearchAll(event) {
        this.searchAllValue = event.target.value;
        this.searchAll();
    }

    searchAll() {
        let searchStr = this.searchAllValue.toLowerCase();
        const regex = new RegExp(
            "(^" + searchStr + ")|(." + searchStr + ")|(" + searchStr + "$)"
        );
        if (searchStr.length > 2) {
            this.searchable = this.data.filter((item) => {
                if (
                    regex.test(
                        item.providerData.PersonName__c.toLowerCase() +
                            " " +
                            item.providerData.PersonName__c.toLowerCase()
                    ) ||
                    regex.test(
                        item.providerData.Specialty_Role__c?.toLowerCase() +
                            " " +
                            item.providerData.Specialty_Role__c?.toLowerCase()
                    ) ||
                    regex.test(
                        item.providerData.ProviderCity__c?.toLowerCase() +
                            " " +
                            item.providerData.ProviderCity__c?.toLowerCase()
                    ) 
                ) {
                    return item;
                }
            });
        } else if (this.caseNumber.length <= 2) {
            this.searchable = this.data;
        }
        console.log(this.searchable);
    }

    handleNavigate(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id
            }
        });
    }
}