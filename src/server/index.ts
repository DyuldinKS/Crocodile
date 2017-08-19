import * as express from 'express';
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res, next) => {
  res.sendFile('./public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // console.log(socket.request.headers);
  
  socket.on('update canvas', (data) => {
    console.log('update');
    socket.broadcast.emit('update canvas', data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.use('/', express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('listening on port: 3000');
});


