import React from 'react';

import Registration from './components/Registration';
import Chat from './components/Chat';

import socket from './socket';
import axios from 'axios';
import reducer from './reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false, roomId: null, userName: null, users: [], messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({type: 'JOINED', payload: obj});
    socket.emit('ROOM:JOINING'); // Submitting to the backend
    const {data} = await axios.get(`/home/${obj.roomId}`); // Server request with actual data
    listUsers(data.users);
  };

  const listUsers = (users) => {dispatch({type: 'USER_STATUS', payload: users})};

  /* One rerender - one listener */
  React.useEffect(() => {
    socket.on('ROOM:USER_STATUS', listUsers);
  }, []);

  window.socket = socket; // For console

  return(
  <div className="wrapper">{!state.joined ? <Registration onLogin={onLogin}/> : <Chat {...state}/>}</div>
  );
}

export default App;
