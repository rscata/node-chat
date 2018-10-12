var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    /** Emit */
    socket.emit('createMessage', {
        from: 'cata',
        text: 'Yup'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});