/* Connecting the framework */
const express = require('express');

const app = express(); // Server application

/* To process queries logic */
const server = require('http').createServer(app); 
const io = require('socket.io')(server);

const rooms = new Map(); // Storing rooms

app.get('/home', (req, res) => {
  res.json(rooms);
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
});

server.listen(8080, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});
