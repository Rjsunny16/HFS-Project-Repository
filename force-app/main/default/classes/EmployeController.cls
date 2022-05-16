public class EmployeController {
 @AuraEnabled(cacheable=true)
     Public static List<Project__c> EmployeeController(String employeeId)  {
        List<Project_Assignment__c> projAssignment = [ SELECT Employee_Name__c ,Project_Name__c From Project_Assignment__c where Employee_Name__c = : employeeId AND Status__c = 'Active'];
        List<Project__c>  proj = new List<Project__c>();
         for(Project_Assignment__c prAss: projAssignment){
             proj.add(new Project__c(Id = prAss.Project_Name__c));
         }
        List<Project__c>  newProj = [Select  id, Name, Project_Start_Date__c, Project_End_Date__c From Project__c Where Id In :proj ];
        return newProj;
         

     }
    
}