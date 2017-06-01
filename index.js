
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
    
http.listen(3000, function(){
  console.log('listening on *:3000');
});
