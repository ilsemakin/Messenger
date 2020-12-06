import React from 'react';

import Registration from './components/Registration';
import Chat from './components/Chat';

import socket from './socket';
import axios from 'axios';
import reducer from './reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false, roomId: null, userName: null, users: [], messages: []
  });

  const onLogin = async (obj) => {
    dispatch({ type: 'JOINED', payload: obj });
    socket.emit('ROOM:JOIN', obj); // Submitting to the backend
    const { data } = await axios.get(`/home/${obj.roomId}`); // Server request with actual data
    dispatch({ type: 'SET_DATA', payload: data });
  };

  const setUsers = (users) => { dispatch({ type: 'SET_USERS', payload: users })};
  const addMessage = (message) => { dispatch({ type: 'NEW_MESSAGE', payload: message })};

  /* One rerender - one listener */
  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket; // For console

  return(<div className="wrapper">{!state.joined ? <Registration onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}</div>);
}

export default App;
