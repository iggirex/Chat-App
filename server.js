var io = require('socket.io')()

io.on("connection", function(socket){
  console.log("We're iniside initial server receiving message and a USER has CONNECteD3")
  // io.sockets.emit("THIS IS socket.broadcast.emit");
  socket.on("chat message", function(msg){
    console.log("message ISSZZ:", msg)
    socket.broadcast.emit("chat message", msg)
  })
  socket.on("disconnect", function(){
    console.log("user HAS disCONnected")
  })
})

module.exports = io
