const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app)
var io = socketIO(server)

var port = process.env.PORT || 3000;


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');


    socket.on('disconnect',()=>{
        console.log('Disconnected from server');
        
    })
    
})

server.listen(port, () => {
	console.log('Server is UP');
});

// console.log(publicPath);
