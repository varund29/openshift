var express = require('express');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://nodejs-atnodejs.rhcloud.com:8000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { origins: 'http://nodejs-atnodejs.rhcloud.com:8000' });

io.set('log level', 1);                    // reduce logging
io.set('transports', ['xhr-polling']);
io.set("polling duration", 10);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    socket.on('chatmessage', function (msg) {
        console.log('index.js(socket.on)==' + msg);
        io.emit('chatmessage', msg);
    });
});

server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);