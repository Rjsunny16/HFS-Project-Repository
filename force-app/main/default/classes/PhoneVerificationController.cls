public class PhoneVerificationController {
    @InvocableMethod(label='Verify Phone' description='Return mobile verification status' category='Account')
   public static List<boolean> verifyPhone(List<string> mobiles)
   {
         PhoneVerificationService.PhoneResponse response=PhoneVerificationService.verifyMobile('+91-'+mobiles[0]);
       system.debug('response:'+response);
       return new List<boolean>{response.phone_valid};
   }
}