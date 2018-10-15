const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    // mesaj de la server catre cel care intra
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // mesaj de la server catre toti clientii
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // lisenner
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text)); 
        callback('This is from server');

        // broadcast la toti, inafara de cel care trimite
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(3000, () => {
    console.log('Server is up on port 3000');
})