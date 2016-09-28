var io = require('socket.io')()
var connections = [];
var users = [];

io.on("connection", function(socket){
  connections.push(socket)
  console.log("connections length: ", connections.length)
  console.log("USER has CONNECteD3, and there are %s sockets connected", connections.length )

  socket.on("send message", function(data){
    console.log("message ISSZZ:", data, "userDOTsocked Username", socket.username)
    io.sockets.emit("new message", {message: data, user: socket.username})
  })

  socket.on("disconnect", function(){
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log("user HAS disCONnected and there are %s sockets connected", connections.length,"THese are the users:", users)
  });

  socket.on("new user", function(username, callback){
    callback(true);
    socket.username = username;
    console.log("socket.username=", socket.username,"username;",username)
    users.push(socket.username);
    updateUsernames();
  });
    function updateUsernames(){
      io.sockets.emit("get users", users)
    }
});
module.exports = io
