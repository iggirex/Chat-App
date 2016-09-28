var io = require('socket.io')()

var connections = [];

io.on("connection", function(socket){
  connections.push(socket)
  console.log("connections length: ", connections.length)
  console.log("USER has CONNECteD3, and there are %s sockets connected", connections.length )
  socket.on("chat message", function(msg){
    console.log("message ISSZZ:", msg)
    socket.broadcast.emit("chat message", msg)
  });
  socket.on("disconnect", function(){
    connections.splice(connections.indexOf(socket), 1);
    console.log("user HAS disCONnected and there are %s sockets connected", connections.length)
  })
});

module.exports = io
