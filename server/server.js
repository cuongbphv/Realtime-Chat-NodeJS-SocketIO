const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

// define variable
var app = express();
var {
    generateMessage,
    generateLocationMessage
} = require('./utils/mesage');
var {
    isRealString
} = require('./utils/validation');
var server = http.createServer(app); // create server for app
var io = socketIO(server); // init server for socket.io in emitting and listening
io.on('connection', (socket) => {

    socket.on('joinRoom', (roomInfo, callback) => {
        if (!isRealString(roomInfo.name) || !isRealString(roomInfo.room)) {
            callback("Name and room name is required");
        }

        socket.join(roomInfo.room);
        socket.emit('newMessage', generateMessage('BOT', 'Welcome to Chat App'));
        socket.broadcast.to(roomInfo.room).emit('newMessage', generateMessage('Admin', `${roomInfo.name} has joined.`));
        callback();

    })


    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', ((coords) => {
        io.emit('newLocationMessage', generateLocationMessage('BOT', coords.latitude, coords.longitude));
    }));

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