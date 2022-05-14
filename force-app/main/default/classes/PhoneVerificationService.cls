public class PhoneVerificationService {
    public static string API_KEY='345CD502D3B44869AA1031CB1CA44AA5';
    public static PhoneResponse verifyMobile(string mobile)
    {
        //Format Country Code-Mobile number ex.  +91-9871506648
        string endpoint='https://api.veriphone.io/v2/verify?phone=mobile&key=apikey';
        endpoint=endpoint.replace('mobile', mobile).replace('apikey',API_KEY);
        endpoint=endpoint.replace('mobile', mobile);
        Http h = new Http();
        HttpRequest hr = new HttpRequest();
        hr.setTimeout(60000);
        hr.setEndpoint(endPoint);
        hr.setMethod('GET');
        system.debug(hr);
        HttpResponse r = h.send(hr);
        return new PhoneResponse().parse(r.getBody());
    }
    
    public class PhoneResponse
    {
        public String status;	//success
        public String phone;	//+49-15123577723
        public boolean phone_valid;
        public String phone_type;	//mobile
        public String phone_region;	//Germany
        public String country;	//Germany
        public String country_code;	//DE
        public String country_prefix;//49
        public String international_number;	//+49 1512 3577723
        public String local_number;	//01512 3577723
        public String e164;	//+4915123577723
        public String carrier;	//T-Mobile
        public PhoneResponse parse(String json){
            return (PhoneResponse) System.JSON.deserialize(json, PhoneResponse.class);
        }
    }
}