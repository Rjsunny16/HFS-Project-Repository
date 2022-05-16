import { LightningElement, track } from 'lwc';

export default class Wtlorganisation extends LightningElement {
    @track valuesFacility=["Hospital", "clinic", "Long term care","hospice care", "Other"];
    @track valuesGroup=["Family",
          "General",
          "Internal medicine",
          "Other"];
    @track selectPracticeType;
    ln;
    @track practiceTypeArray;
    @track option;
    practiceChange(practice)
    {
       selectPracticeType = document.getElementById('00N5j00000Iza9x');
       ln = selectPracticeType.length - 1;
        while (ln > 0)
              {
              selectPracticeType.remove(1);
              ln--;
              }
        switch(practice)
              {
              case 'Facility':
              practiceTypeArray=valuesFacility;
              break;
              case 'Group':
              practiceTypeArray=valuesGroup;
              break;
              default:
              }
    
        for (i = 0; i < practiceTypeArray.length; i++)
              {
              //option = document.createElement('option');
              option.text = practiceTypeArray[i];
              option.value = practiceTypeArray[i];
              selectPracticeType.add(option);
              }
    }
}