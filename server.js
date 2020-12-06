/* Connecting the framework */
const express = require('express');

/* Server application */
const app = express();

/* To process queries logic */
const server = require('http').createServer(app); 
const io = require('socket.io')(server);

/* We connect an intermediary */
app.use(express.json());

/* Storing rooms */
const rooms = new Map();

app.get('/home', (req, res) => {
  res.json(rooms);
});

app.post('/home', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) { rooms.set(roomId, new Map([ ['users', new Map()], ['messages', []] ])); }
  res.send();
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);
});

server.listen(8080, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});
