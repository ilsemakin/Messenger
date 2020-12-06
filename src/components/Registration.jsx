import React from 'react';
import axios from 'axios';

function Registration({onLogin}) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  /* Login check */
  const onEnter = async () => {
    if (!roomId || !userName) { return alert('Заполните пустые поля'); }
    const obj = {roomId, userName};
    setLoading(true);
    await axios.post('/home', obj);
    onLogin(obj);
  };

  return(
    <div className="join-block">
      <img class="lock_image" src="/img/lock.jpg" alt="lock" />
      <h2>Регистрация</h2>
      <input type="text" placeholder='Номер комнаты' value={roomId} onChange={(e) => setRoomId(e.target.value)}></input>
      <input type="text" placeholder='Имя' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <button disabled={isLoading} onClick={onEnter} className="btn btn-success">{isLoading ? 'ВХОД...' : 'ВОЙТИ'}</button>
    </div>
  );
}

export default Registration;
