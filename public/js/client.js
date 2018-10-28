var socket = io();

socket.on('connect', () => {
    var roomInfo = deparam();

    socket.emit('joinRoom', roomInfo, (err) => {
        if(err){
            alert(err);
            window.location.href = "/";
        }
        else{
            console.log("No error");
        }
    });
});

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render($('#message-template').html(), {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    $('#list-message').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render($('#location-message-template').html(), {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#list-message').append(html);
    scrollToBottom();
});

$('#form-message').on('submit', (e) => {
    e.preventDefault(); // turn off event submit default
    
    socket.emit('createMessage', {
        from: 'Cuong',
        text: $('[name=message]').val()
    }, () => {
        $('[name=message]').val("");
    });
});

$('#send-location').on('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }

    $('#send-location').attr('disabled', 'disabled').text('Sending location ...');
    
    navigator.geolocation.getCurrentPosition((position) => {
        $('#send-location').removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, () => {
        $('#send-location').removeAttr('disabled').text('Send Location');
        $('#list-message').append(`<li>Uabled to fetch your location, check Internet connection.</li>`);
    });
})

socket.on('disconnect', () => {
    console.log('Disconnected to Server');
});