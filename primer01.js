var http= require("http");
var firmata=require("firmata");
console.log("priklop Arduina");

var board = new firmata.Board("/dev/ttyACM0",function(){
    console.log("Aktiviramo pin 13");
    board.pinMode(13, board.MODES.OUTPUT);
    
    http.createServer(function(req, res){
        var parts = req.url.split("/"),
        operator=parseInt(parts[1],10);
        
        if(operator== 0){
            console.log("izključevanje LED");
            board.digitalWrite(13,board.LOW);
        }
        else if (operator==1){
            console.log("vključevanje LED");
            board.digitalWrite(13, board.HIGH);
        }
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        res.write("Za test vpišite IP naslov, port in 0 ali 1\n");
        res.end("vrednost vnešenega operatorjaje:"+ operator);
    }).listen(8080,"192.168.1.139");
});