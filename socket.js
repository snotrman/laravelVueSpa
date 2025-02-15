var server = require('http').Server();
var io = require('socket.io')(server);
const env = require('dotenv').config();


var Redis = require('ioredis');
var redisNewMessage = new Redis();
var redisUserEntered = new Redis();

redisNewMessage.subscribe(process.env.APP_NAME + '-' + 'post-channel', function() {
    console.log('connected to new message channel');
});
redisUserEntered.subscribe(process.env.APP_NAME + '-' + 'user-entered-chat-channel', function () {
    console.log('connected to user entered channel');
});

redisNewMessage.on('message', function (channel, message) {
    message = JSON.parse(message);
    console.log(message);
    io.emit(channel + ":" + message.event, message.data);
})

redisUserEntered.on('message', function (channel, message) {
    console.log('user entered');
    message = JSON.parse(message);
    io.emit(channel + ":" + message.event, message.data);
})

server.listen(3001);

// redisNewMessage.on('message', function (channel, message) {
//     message = JSON.parse(message);
//     // console.log(channel, message)
//     // console.log(messageContent.event, message.data);
//     io.emit(channel + ':' + message.event, message.data);
// });