const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// define app ExpressJS
var app = express();
var server = http.createServer(app); // create server for app
var io = socketIO(server); // init server for socket.io in emitting and listening
io.on('connection', (socket) => {
    console.log('New User connected');
    
    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

//config port and listen on port
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});

//define variable
const publicPath = path.join(__dirname, '../public');

//Middleware
app.use(express.static(publicPath));



