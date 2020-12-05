/* Connecting the framework */
const express = require('express');

const app = express(); // Server application

/* To process queries logic */
const server = require('http').createServer(app); 
const io = require('socket.io')(server);



app.get('/user', (req, res) => {
  console.log("Hello");
  res.json();
});

server.listen(3000, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});