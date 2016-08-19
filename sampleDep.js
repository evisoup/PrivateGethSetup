var Web3 = require('web3');
var fs = require('fs');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.coinbase;

//console.log(web3.eth.coinbase);


//var greeterSource = '';

// var sol = fs.readdirSync('./testFolder');


// sol.forEach(function(file){
// 		try {
			source = fs.readFileSync('./contracts/' + 'helloWorld.solc', 'utf8');
			greeterCompiled = web3.eth.compile.solidity(source);

	// 	} catch (err) {console.log(err)}
	// });



//var greeterCompiled = web3.eth.compile.solidity(greeterSource);


var _greeting = "Hello World with counter 99!"
var greeterContract = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition);

//var greeter = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition).at("0xd69dd2f38256a11cba3a8575d08eec5d01cfb7cb")

var greeter = greeterContract.new(_greeting,{from:web3.eth.accounts[0], data: greeterCompiled.greeter.code, gas: 3000000}, function(e, contract){
   if(!e) {

     if(!contract.address) {
       console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

     } else {
       console.log("Contract mined! Address: " + contract.address);
     }

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