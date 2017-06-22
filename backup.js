
var express = require('express');
var http=require("http");
var WebSocketServer = require('websocket').server;

var server=http.createServer(function(request,response){

response.writeHead(200,{'Content-Type':'text/plain'});
console.log("Reached Here");
response.end("Hello World\n");	

});
server.listen(4343, function() { });

console.log('Server is up running');

wsServer=new WebSocketServer({
   httpServer:server

});

wsServer.on('request',function(request){

var connection=request.accept('echo-protocol',request.origin)
console.log("Connection accepted");


connection.on('message',function(message){

	if(message.type==='utf8'){

		console.log(message.utf8Data);
		new_msg="Hello "+message.utf8Data;
		message.utf8Data=new_msg;
		console.log("Message sent by the server"+new_msg);
		connection.sendUTF(new_msg);
	}
     else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
        }

});


connection.on('close',function(connection){

console.log("Client connection disconnected");
});

});


