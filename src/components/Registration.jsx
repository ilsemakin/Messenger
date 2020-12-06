import React from 'react';
import axios from 'axios';
import socket from '../socket';

function JoinBlock() {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const onEnter = () => {
    if (!roomId || !userName) { return alert('Заполните пустые поля'); }
    console.log(roomId, userName);
    axios.post('/home', { roomId, userName });
  }

  return(
    <div className="join-block">
      <h2>Регистрация</h2>
      <input type="text" placeholder='Номер комнаты' value={roomId} onChange={(e) => setRoomId(e.target.value)}></input>
      <input type="text" placeholder='Имя' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <button onClick={onEnter} className="btn btn-success">Войти</button>
    </div>
  );
}

export default JoinBlock;
