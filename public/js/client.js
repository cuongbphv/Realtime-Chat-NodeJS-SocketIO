var socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', (message) => {
    console.log(message);

    $('#listMessage').append(`<li class="collection-item">${message.from}:${message.text}</li>`);
});

$('#formMessage').on('submit', (e) => {
    e.preventDefault(); // turn off event submit default
    
    socket.emit('createMessage', {
        from: 'Cuong',
        text: $('[name=message]').val()
    }, (data) => {
        $('[name=message]').val("");
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected to Server');
});