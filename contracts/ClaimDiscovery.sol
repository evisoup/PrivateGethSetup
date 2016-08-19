contract ClaimDiscovery {
    
    /* Geth node owner*/
    address owner;
    /* for testing purpose*/
    string public zipcode;
    uint public arrayLen;
    uint public index;
    uint[] public arrayID;
    uint[2] public testArray;
    
    
    /*the event SC will fire once a zip code is passed to it*/
    event SendNotificationToDB( string _zipCode);
    event ImpactedCustomerID( uint _customerID);

    /*SC constructor: set the owner  */
    function ClaimDiscovery(){
        owner = msg.sender;
        testArray[0]=11;
        testArray[1]=22;
    }

    /*the function that front end app js will call, with a zipcode*/
    /*to trigger ARROW 1(i.e US1)*/
    function NotifyDB( string _zipCode)
        byTheOwner(){
        zipcode = _zipCode;
        SendNotificationToDB(_zipCode);
    }

    /*receive a array of uin(customer ID)*/
    /*fire off events during iteration to trigger SMS notification*/
    /*to trigger ARROW 2(i.e US2+US3)*/
    function ReceiveFromDB( uint[] _customerIDs){
        
        uint len  = _customerIDs.length;
        arrayLen = len;
        
        for (uint i = 0; i < len; i++){
           ImpactedCustomerID(_customerIDs[i] );
        }

    }

    /*ensure its the SC owner calling, not someone else*/
    modifier byTheOwner () {
        if (msg.sender == owner) _
       
    }

}