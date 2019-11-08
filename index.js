const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const emojis = require('emojis-list');

console.log("There are "+ emojis.length +" emojis");
for(var i=0;i<30;i++){
    console.log(i+1+"."+emojis[i]);
    
}

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' has joined the chat...</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' has left the chat... Goodbye!</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});