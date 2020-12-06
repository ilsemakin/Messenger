/* Connecting the framework */
const express = require('express');

const app = express(); // Server application

/* To process queries logic */
const server = require('http').createServer(app); 
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map(); // Storing rooms

app.get('/home', (req, res) => {
  res.json(rooms);
});

app.post('/home', (req, res) => {
  const { rooId, userName } = req.body;
  if (!rooms.has(roomId)) { rooms.set(rooId, new Map([ ['users', new Map()], ['messages', []] ])); }
  res.send();
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);
});

server.listen(8080, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});
