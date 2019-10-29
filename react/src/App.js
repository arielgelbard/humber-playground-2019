import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import firebase from './firebase';

function App() {
  const firebaseRef = firebase.database().ref('chat');
  const [chatRoom, setChatRoom] = useState([]);
  const [message, setMessage] = useState('');
  const messagesView = useRef(null);
  let firstTime = false;

  useEffect(() => {
    console.log('react');
    firebaseRef.on('value', (res) => {
      const theChatRoom = res.val();
      let data = [];
      theChatRoom && Object.keys(theChatRoom)
      .map( messageId => {
        return data.push({ id: messageId, ...theChatRoom[messageId] });
      })
      setChatRoom(data);
      if(!firstTime) {
        window.scroll(0, document.body.scrollHeight + 60);
        firstTime = true;
      }
    });
  }, []);

  const editMessage = (payload) => {
    message !== '' && firebaseRef.child(payload.id).set({ 
      message: message
    });
    setMessage('');
  };

  const deleteMessage = (payload) => {
    firebaseRef.child(payload.id).set(null);
  };

  const newMessage = (event) => {
    if (event.charCode === 13) {
      firebaseRef.push({
        message: message
      }).then(() => {
        setMessage('');
        window.scroll(0, document.body.scrollHeight + 60);
      })
    }
  }

  return (
    <div id="parent">
      <div id="messages" ref={messagesView}>
        {
          chatRoom
          .map( (messagePayload, index) => 
            (
              <div key={messagePayload.id}>
                <p onClick={() => editMessage(messagePayload)}>{messagePayload.message}</p>
                <button onClick={() => deleteMessage(messagePayload)}>Delete</button>
              </div>
            )
          )
        }
      </div>
      <div id="messageArea">
        <input 
        type="text" 
        id="message" 
        placeholder="Message" 
        onKeyPress={e => newMessage(e)}
        onChange={e => setMessage(e.target.value)} 
        value={message}/>
      </div>
    </div>
  );
}

export default App;
