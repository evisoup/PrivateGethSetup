
io.sockets.on('connection', function (socket) {

    socket.on('dVoteContractsVoteCompleteEvents', function (data) {
    
    
                 var eventFilter = web3.eth.contract(ClaimDiscoverySC.ABI).at( ClaimDiscoverySC.ADDRESS   ).allEvents();

                //var eventFilter = web3.eth.contract(StockExchangeSC.ABI).at(data['address']).eventVoteReceived({foo:'bar'},{ fromBlock:'latest'});
    
    
                eventFilter.watch(function(err,response){
                    console.log("contract event happened");
    
                    if(!err)
                    {
                        console.log("contract event happened, !err");
                        socket.emit('contractEventHappened', response);
                    }else{
                        
                    } 
