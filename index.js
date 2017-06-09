var express = require('express');
var app = express();

app.use(require('cors'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

const port = process.env.PORT || 8641;

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
		console.log("call", call);
	});


	/**
	* reply : encrypted blob
	*/
	socket.on('relaytelecom-reply', (reply) => {
		socket.broadcast.emit('relaytelecom-reply', reply);
		console.log("reply: " + reply);
	});


	/**
	* reply : encrypted blob
	*/
	socket.on('relaytelecom-affirm', (affirm) => {
		socket.broadcast.emit('relaytelecom-affirm', affirm);
		console.log("affirm: " + affirm);
	});



	/**
	* Relay Advertise ip and port
	*/
	socket.on('relaytelecom-advertise', (advertisement) => {
		if (advertisement.length > 0) {
			socket.broadcast.emit('relaytelecom-advertise', advertisement);
			console.log("advertise: " + advertisement);
		}
	});

	socket.on('disconnect', (retreat) => {
		socket.broadcast.emit('relaytelecom-retreat', retreat);
		console.log("retreat: " + retreat);
	});

});

http.listen(port, function(){
  console.log('listening on localhost:' + port);
});
