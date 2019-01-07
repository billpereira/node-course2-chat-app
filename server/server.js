const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

    socket.emit('newMessage', {
        from:'Admin',
        text: 'Welcome to the chatApp',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
			from: 'Admin',
			text: 'New user joined',
			createdAt: new Date().getTime()
		});

	socket.on('createMessage', message => {
		console.log('createMessage: ', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
        });
        
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
