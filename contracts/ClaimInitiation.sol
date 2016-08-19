contract ClaimInitiation {
    
    /* Geth node owner*/
    address owner;
    
    /* for testing purpose*/
    bool public cusChoice;
    uint public cusID;
    string public claimType;
    
    
    /*the event SC will fire once a zip code is passed to it*/
    event CustomerAccepts( uint _customerID);
    event CustomerDeclines( uint _customerID);
    event STPtype(uint _customerID, string _ClaimType);
    /*
    event ClaimValidForStraightThrough( uint _customerID );
    event ClaimNotValidForStraightThrough( uint _customerID );
    */

    /*SC constructor: set the owner  */
    function ClaimInitiation(){
        owner = msg.sender;
    }

    /*front end app js will call this after customer ACCEPTS the claim initiation, US4*/
    /*fire events for app to "Determine Claim Type"*/
    function Accepts( uint _customerID)
        byTheOwner(){
        cusChoice = true;
        cusID = _customerID;
        CustomerAccepts(_customerID);
    }

    /*front end app js will call this after customer DECLINES the claim initiation, US4*/
    /*fire events for app to "Terminate Claim"*/
    function Declines( uint _customerID)
        byTheOwner(){
        cusChoice = false;
        cusID = _customerID;
        CustomerDeclines(_customerID);
    }

    /*After "Determine Claim Type", App passes in boolean value to suggest "Straight Through",US7*/
    /*fire events for app to "Determine Claim Type"*/
    function ValidForStraightThrough( uint _customerID, string _ClaimType)
        byTheOwner(){

        cusID = _customerID;
        claimType = _ClaimType;
        STPtype( _customerID,  _ClaimType);

    }

    /*ensure its the SC owner calling, not someone else*/
    modifier byTheOwner () {
        if (msg.sender == owner) _
    }

}