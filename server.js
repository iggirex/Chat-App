var io = require('socket.io')()
var connections = [];
var users = [];
var room = ["room1", "room2", "room3"];

io.on("connection", function(socket){
  connections.push(socket)
  console.log("connections length: ", connections.length)
  console.log("USER has CONNECteD3, and there are %s sockets connected", connections.length )

  socket.on("new user", function(username, callback){
    callback(true);
    socket.username = username;

    socket.room = room[0]
    socket.join(room[0])
    console.log("socket.username=", socket.username,"username;",username)
    users.push(socket.username);
    users.push(socket.roomname);
    updateUsernames();
  });

  socket.on("send message", function(data){
    console.log("message ISSZZ:", data, "userDOTsocked Username", socket.username, "you'RE inside ROOM:", socket.room)
    io.sockets.emit("new message", {message: data, user: socket.username, room: socket.room})
  })

  socket.on("disconnect", function(){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    socket.leave(room[0])
    connections.splice(connections.indexOf(socket), 1);
    console.log("user HAS disCONnected and there are %s sockets connected", connections.length,"THese are the users:", users)
  });

    function updateUsernames(){
      io.sockets.emit("get users", users)
    }
});
module.exports = io
