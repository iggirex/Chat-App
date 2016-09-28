//this command is all it takes to load the io client and connect, io doesn't need a path, it connects to the host serving the page
$(function(){
  var socket = io()
//if you want jQuery in your file, the entire file has to be wrapped in a jQuery function

$("#messageForm").submit(function(e){
  e.preventDefault();
  // $("#chatDiv").append("<p>"+$("#m").val()+"</p>")
  socket.emit("send message", $("#m").val());
  $("#m").val("");
    })

  socket.on("new message", function(msg){
      console.log("THIS IS MSG@@@@: ", msg)
      $("#chatDiv").append($("<div><strong>"+msg.user+"</strong> :"+msg.message+"</p></div>"))
  })

  $("#userForm").submit(function(e){
    console.log("user form being submitted!!!")
    e.preventDefault();
    socket.emit("new user", $("#username").val(), function(data){
      if(data){
        $("#userFormArea").hide();
        $("#messageArea").show();
      }
    });
  })
    socket.on("get users", function(data){
      var html = "";
      for(i=0; i<data.length;i++){
        html += "<li class=list-group-item>"+data[i]+"</li>"
      }
      $("#users").html(html);
    })
})
