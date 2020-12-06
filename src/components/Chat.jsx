import React from 'react';
import socket from '../socket';

function Chat({ users, messages }) {
  return (
    <div className="chat">
      <div className="chat-users">
        <b>Онлайн ({users.length}):</b>
        <ul> { users.map((name, index) => (<li key={name + index}>{name}</li>)) }
        </ul>
      </div>
      <div className="chat-messages">
      </div>
        <form>
          <textarea
            className="form-control"
            rows="3"></textarea>
          <button type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
    </div>
  );
}

export default Chat;
