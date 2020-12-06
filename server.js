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

app.get('/home/:id', (req, res) => {
  const { id: roomId } = req.params;
  
  /* 
  * Checking the existence of a room
  * If the room exists, return the actual values
  * Otherwise, empty values are returned (there are no users and messages)
  */
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()]
  } : { users: [], messages: [] };

  res.json(obj);
});

app.post('/home', (req, res) => {
  const {roomId, userName} = req.body;
  if (!rooms.has(roomId)) { rooms.set(roomId, new Map([ ['users', new Map()], ['messages', []], ]),); }
  res.send();
});

io.on('connection', (socket) => {
  
  socket.on('ROOM:JOIN', ({roomId, userName}) => {
    socket.join(roomId); // Join a user to a room
    rooms.get(roomId).get('users').set(socket.id, userName); // Transferring user data to the room
    const users = [...rooms.get(roomId).get('users').values()]; // Save all connected users
    socket.to(roomId).emit('ROOM:SET_USERS', users); // Notifying all users about a new connection
  });

  socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
    const obj = {userName, text}; // User message
    rooms.get(roomId).get('messages').push(obj); // Save the user's message
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj); // Passing a message to users
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]; // Save all connected users
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users); // Alerting all users when a user is disconnected
      }
    });
    console.log('User disconnected', socket.id);
  });

  console.log('User connected', socket.id);
});

server.listen(8080, (error) => {
  if (error) { throw Error(error); }
  console.log("Server started!");
});
