var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.coinbase;

//console.log(web3.eth.coinbase);


var greeterSource = 'contract mortal { /* Define variable owner of the type address*/ address owner; /* this function is executed at initialization and sets the owner of the contract */ function mortal() { owner = msg.sender; } /* Function to recover the funds on the contract */ function kill() { if (msg.sender == owner) selfdestruct(owner); } } contract greeter is mortal { /* define variable greeting of the type string */ string public greeting; uint public counter; /* this runs when the contract is executed */ function greeter(string _greeting) public { greeting = _greeting; counter = 0; } /* main function */ function greet() constant returns (string) { counter = counter + 1; return greeting; } /* main function */ function bye() returns (string) { counter = counter + 1; return greeting; } }';


var greeterCompiled = web3.eth.compile.solidity(greeterSource);

//console.log(greeterCompiled)

var _greeting = "Hello World with counter 4!"
var greeterContract = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition);

//console.log(greeterCompiled.greeter.info.abiDefinition);

var greeter = greeterContract.new(_greeting,{from:web3.eth.accounts[0], data: greeterCompiled.greeter.code, gas: 300000}, function(e, contract){
   if(!e) {

     if(!contract.address) {
       console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

     } else {
       console.log("Contract mined! Address: " + contract.address);
     }

   }
})