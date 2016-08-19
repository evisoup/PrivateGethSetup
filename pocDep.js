var Web3 = require('web3');
var fs = require('fs');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.coinbase;

//console.log(web3.eth.coinbase);


//var greeterSource = 'contract mortal { /* Define variable owner of the type address*/ address owner; /* this function is executed at initialization and sets the owner of the contract */ function mortal() { owner = msg.sender; } /* Function to recover the funds on the contract */ function kill() { if (msg.sender == owner) selfdestruct(owner); } } contract greeter is mortal { /* define variable greeting of the type string */ string public greeting; uint public counter; /* this runs when the contract is executed */ function greeter(string _greeting) public { greeting = _greeting; counter = 0; } /* main function */ function greet() constant returns (string) { counter = counter + 1; return greeting; } /* main function */ function bye() returns (string) { counter = counter + 1; return greeting; } }';




			 var source = fs.readFileSync('./contracts/' + 'ClaimDiscovery.sol', 'utf8');
			 var scCompiled = web3.eth.compile.solidity(source);




//var greeterCompiled = web3.eth.compile.solidity(greeterSource);


var claimContract = web3.eth.contract(scCompiled.ClaimDiscovery.info.abiDefinition);

//var greeter = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition).at("0xd69dd2f38256a11cba3a8575d08eec5d01cfb7cb")

var claimInstance = claimContract.new( {from:web3.eth.accounts[0], data: scCompiled.ClaimDiscovery.code, gas: 3000000}, function(e, contract){
   if(!e) {

     if(!contract.address) {
       console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

     } else {
       console.log("Contract mined! Address: " + contract.address);
     }

   }else{
	console.log(e);
}
})




// compiling tools!!!

// function build() {
// 	if (!interfaces)
// 		interfaces = load('interfaces');
// 	sol = fs.readdirSync('contracts/sol');
// 	sol.forEach(function(file){
// 		try {
// 			source = fs.readFileSync('contracts/sol/' + file, 'utf8');
// 			compiled = web3.eth.compile.solidity(source);
// 			Object.keys(compiled).forEach((elem) => {
// 				code = compiled[elem].code;
// 				codeHash = web3.sha3(code);
// 				abi = compiled[elem].info.abiDefinition;
// 				interfaces[elem] = {
// 					addresses: [],
// 					code : code,
// 					codeHash : codeHash,
// 					abi : abi,
// 				};
// 			});
// 			store('interfaces', interfaces);
// 		} catch (err) {console.log(err)}
// 	});	
// }