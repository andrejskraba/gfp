var http = require ("http"); 
var firmata = require("firmata");
console.log("Priklop Andruina");

var board = new firmata.Board("/dev/ttyACM0", function(){
   console.log("Aktiviramo pin 13");
   board.pinMode(13, board.MODES.OUTPUT);
      console.log("Aktiviramo pin 8");
   board.pinMode(8, board.MODES.OUTPUT);
   
   http.createServer(function(req,res){
       var parts = req.url.split("/");
       var operator1 = parseInt(parts[1],10);
       var operator2 = parseInt(parts[2],10);
       
      
       
       if (operator1 == 0) {
           console.log("izključevanje LED");
           board.digitalWrite(13, board.LOW);
       }
       else if (operator1 == 1) {
           console.log("Vključevanje LED");
           board.digitalWrite(13,board.HIGH);
       }
       
         if (operator2 == 0) {
           console.log("izključevanje LED");
           board.digitalWrite(8, board.LOW);
       }
       else if (operator2 == 1) {
           console.log("Vključevanje LED");
           board.digitalWrite(8,board.HIGH);
       }
       
       res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
       res.write("ZA test vpišite IP naslov, port in 0 ali 1 \n");
       res.end("Vrednost operatorjev: " + operator1 + "|"  + operator2);
   }).listen(8080, "192.168.1.139");
});
