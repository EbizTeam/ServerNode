
exports.initialize = function (server) {

    let io =  require('socket.io')(server);

    io.sockets.on("connection", function (socket) {
        console.log("co nguoi connect");
        socket.send(JSON.stringify(
            {
                type: 'serverMessage',
                message: 'Welcome to the most interesting chat room on earth!'
            }));

        socket.on('message', function (message) {
            message = JSON.parse(message);
            if (message.type == "userMessage") {
                socket.broadcast.send(JSON.stringify(message));
                message.type = "myMessage";
                socket.send(JSON.stringify(message));
            }
        });
    });
};