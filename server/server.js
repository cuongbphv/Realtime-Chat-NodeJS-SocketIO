const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// define variable
var app = express();
var {generateMessage} = require('./utils/mesage');
var server = http.createServer(app); // create server for app
var io = socketIO(server); // init server for socket.io in emitting and listening
io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined Chat Room'));
    
    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
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



