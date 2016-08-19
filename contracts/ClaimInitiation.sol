contract FloodEvent {
    
    // Geth node owner
    address owner;
    //the event SC will fire once a zip code is passed to it
    event SendNotificationToDB( string _zipCode);
    event ImpactedCustomerID( uint _customerID);

    //SC constructor: set the owner  
    function FloodEvent(){
        owner = msg.sender;
    }

    //the function that front end app js will call, with a zipcode
    //to trigger ARROW 1(i.e US1)
    function NotifyDB( string _zipCode)
        byTheOwner(){
        SendNotificationToDB(_zipCode);
    }

    //receive a array of uin(customer ID)
    //fire off events during iteration to trigger SMS notification
    //to trigger ARROW 2(i.e US2+US3)
    function ReceiveFromDB( uint256[] _customerIDs){

        uint len  = _customerIDs.length;
        for (uint i = 0; i < len; i++){
           ImpactedCustomerID(_customerIDs[i] );
        }

    }

    //ensure it's the SC owner calling, not someone else
    modifier byTheOwner () {
        if (msg.sender == owner) _
       
    }

}