var socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', (message) => {
    console.log(message);
})

socket.on('disconnect', () => {
    console.log('Disconnected to Server');
});