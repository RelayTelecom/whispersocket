var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

const port = 8641;

const keyMapping = {};

io.on('connection', function(socket){

	/**
	* call: {
	*		address: string,
	*   challenge: string(10),
	*		self: string,
	*		pubkey: string,
	* }
	*/
	socket.on('relaytelecom-call', (call) => {
		socket.broadcast.emit('relaytelecom-call', call);
	});


	/**
	* reply : encrypted blob
	*/
	socket.on('relaytelecom-reply', (reply) => {
		socket.broadcast.emit('relaytelecom-reply', reply);
	});


	/**
	* reply : encrypted blob
	*/
	socket.on('relaytelecom-affirm', (affirm) => {
		socket.broadcast.emit('relaytelecom-affirm', reply);
	});

});

http.listen(port, function(){
  console.log('listening on localhost:' + port);
});
