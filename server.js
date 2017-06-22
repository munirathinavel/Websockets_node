
var express = require('express');
var http=require("http");
var rl=require('readline');
var WebSocketServer = require('websocket').server;
var prompts=rl.createInterface(process.stdin,process.stdout);

var server=http.createServer(function(request,response){
response.writeHead(200,{'Content-Type':'text/plain'});
response.end("Hello World\n");	
});
server.listen(4343, function() {});

console.log('Server is up running');

wsServer=new WebSocketServer({
   httpServer:server
});

wsServer.on('request',function(request){

var connection=request.accept('echo-protocol',request.origin)
console.log("Connection accepted");

connection.on('message',function(message){
		console.log(message.utf8Data);
        prompts.question("Please enter the message to the client"+"\n",function(msg){
            console.log("Message sent by the server to the client:"+msg);
            connection.sendUTF(msg);
        });		
});


connection.on('close',function(connection){
console.log("Client connection disconnected");
process.exit();
});
});


