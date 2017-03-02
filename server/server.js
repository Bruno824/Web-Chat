let path = require('path');
let http = require('http');
let express = require('express');
let socketIO = require('socket.io');

let publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');

  socket.on('createMessage', function(message) {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  });

  socket.on('disconnect', function() {
    console.log('User was disconnected');
  })
})

server.listen(port, function() {
  console.log(`Server is up running at ${port}`);
});
