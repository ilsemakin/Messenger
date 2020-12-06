import React from 'react';

import JoinBlock from './components/Registration';

import socket from './socket';
import axios from 'axios';
import reducer from './reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false, roomId: null, userName: null, users: [], messages: [],
  });

  const onLogin = () => {
    dispatch({type: 'JOINED', payload: true});
  };

  return(<div className="wrapper"><JoinBlock onLogin={onLogin} /></div>);
}

export default App;
