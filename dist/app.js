var app = require('express')();
var http = require('http').Server(app);
var Port = process.env.port || 3000;

var path = require('path');
var io = require('socket.io')(http);

var customNameSpace = io.of('/custom-namespace');

customNameSpace.on('connection', function (socket) {
    console.log('nameSpace connected');

    customNameSpace.emit('CustomeEvent', "tester Event Call");

    socket.on('disconnect', () => {
        console.log('A user Disconnect');
    });
});

// var users=0;

//io setup on serverside
io.on('connection', function (socket) {
    console.log("A user Connected");
    socket.on("send_message_client", function (value) {
        // io.emit("send_message_server",value) //to send all user including sender
        socket.broadcast.emit("send_message_server", value); //to see all user except who send
    });

    // users++;
    //for all broadcast new or old all can see
    // io.sockets.emit('broadcast',{message:users + `user Connected!`});

    //for custom broadcast new user see only
    // socket.emit('newuserConnect',{message:"Hi,welcome to chatBox!"})
    //for only which user already connected can see msg
    // socket.broadcast.emit('newuserConnect',{message:users + "Users Connected"})

    socket.on('disconnect', () => {
        console.log('A user Disconnect');
        // users--
        // io.sockets.emit('broadcast',{message:users + `user Connected!`});

        // socket.broadcast.emit('newuserConnect',{message:users + "Users Connected"})
    });
});

app.get('/', function (req, res) {
    var options = {
        root: path.join(__dirname)
    };
    var filename = 'index.html';
    res.sendFile(filename, options);
});

http.listen(Port, function () {
    console.log("server ready on 3000");
});
//# sourceMappingURL=app.js.map