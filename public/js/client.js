var socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});

socket.on('newMessage', (message) => {
    console.log(message);

    $('#listMessage').append(`<li class="collection-item">${message.from} : ${message.text}</li>`);
});

socket.on('newLocationMessage', (message) => {
    $('#listMessage').append(`<li class="collection-item">${message.from} : <a target="_blank" href="${message.url}">My current location</a></li>`);
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

$('#sendLocation').on('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, () => {
        alert('Unable to fetch location.');
        $('#listMessage').append(`<li class="collection-item">Uabled to fetch your location.</li>`);
    });
})

socket.on('disconnect', () => {
    console.log('Disconnected to Server');
});