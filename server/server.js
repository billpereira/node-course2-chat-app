const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message')

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage: ', message);
		io.emit('newMessage', generateMessage(message.from,message.text));
        callback();
        // socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from server');
	});
});

server.listen(port, () => {
	console.log('Server is UP');
});

// console.log(publicPath);
