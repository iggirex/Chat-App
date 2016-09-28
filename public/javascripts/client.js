//this command is all it takes to load the io client and connect, io doesn't need a path, it connects to the host serving the page

$(function(){
  var socket = io()
//if you want jQuery in your file, the entire file has to be wrapped in a jQuery function

console.log("WERE inside Client")

socket.on("initMessageToFront", function(){
  console.log("Receiving message from back");
})

socket.on("chat message", function(msg){
  $("#chatDiv").append($("<p>").text(msg))
})

$("form").submit(function(){
  var mess = $("#m").val();
  $("#chatDiv").append("<p>"+mess+"</p>")
  socket.emit("chat message", $("#m").val());
  $("#m").val("");
  return false
    })
  })
