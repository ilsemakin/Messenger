import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  
  let currentUser = false; const name = userName.trim()
  if (currentUser === name) { currentUser = true }

  /* Check for empty input */
  function checkInput(text) {
    console.log(users)
    // return /[^\s]/gim.test(tex);
    return text.trim() !== '';
 }

 function turnOnScroll(length) {
   if (length > 6) { return "chat-users-scroll" }
   else return "";
 }

  /* Handling message sending */
  const onSendMessage = () => {
    if (checkInput(messageValue)) {
      socket.emit('ROOM:NEW_MESSAGE', {userName, roomId, text: messageValue});
      onAddMessage({userName, text: messageValue}); // Sending a message to ourselves
      setMessageValue('');
    }
  };

  const refreshPage = () => { window.location.reload(); }

  const choosePosition = (message, user1, user2) => {
    if (user1 === user2) { return (
      <div className="message self-message" align ="right">
        <p>{message.text}</p>
        <div>
          <span>{message.userName}</span>
        </div>
      </div>
    )}
    else { return (
      <div className="message other" >
        <p>{message.text}</p>
        <div>
          <span>{message.userName}</span>
        </div>
      </div>
    )}
  }

  /* Scrolls messages down */
  React.useEffect(() => { messagesRef.current.scrollTo(0, 99999) }, [messages]);
  
  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <button type="button" className="btn exit-button" onClick={refreshPage}>Покинуть</button>
        <hr />
        <b>Онлайн ({users.length}):</b>
          <div className = {turnOnScroll(users.length)}>
        <ul>{users.map((name, index) => <li key={name + index}>{name}</li>)}</ul>
        </div>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          { messages.map((message) => (choosePosition(message, message.userName, userName))) }
        </div>
        <form>
          <textarea
            placeholder = "Ваше сообщение..."
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            onKeyDown={(ev) => { if (ev.key === 'Enter') { ev.preventDefault(); onSendMessage(); }}}
            className="form-control"
            rows="3">
          </textarea>
          <div className = "send-button">
          <button onClick={onSendMessage} type="button" className="btn btn-primary">
          <img className = "send-image" src="https://cdn.onlinewebfonts.com/svg/img_164228.png" alt="Отправить"/>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
