public with sharing class resetPassword {
    
    @InvocableMethod(label='Invoke Apex')
    public static void getUserId(List<String>Id) {
        System.resetPassword(Id.get(0), true); 
     }
     public class userRequest{
        @InvocableVariable
        public List<String> userId;
     }
}
