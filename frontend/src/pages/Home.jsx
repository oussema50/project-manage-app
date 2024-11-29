import React, { useState, useEffect } from 'react';

import { isAdmin, isLogin } from '../utils/PrivateRoute';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

export const Home = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const user = useSelector(state=>state.userAuth.user)
  const socket = io('http://localhost:5001');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
        console.log('Message from backend:', data);
        setChat((prevChat) => {
            const updatedChat = [...prevChat, data.message];
            console.log('Updated chat state:', updatedChat);
            return updatedChat;
        });
    });

    return () => {
        socket.disconnect();
    };
}, []);
  const sendMessage = () => {
    
    socket.emit('sendmessage', {
        userId: '5', // Target user's ID
        message: message,
      });
      setMessage('');
    
};
console.log('message=======>',message)
console.log('chat=======>',chat)
  // useEffect(()=>{
  //   isLogin();
  //   isAdmin();
  // },[])
  return  (
    <div style={{ padding: '20px' }}>
        <h1>Socket.IO Chat</h1>
        <div style={{ border: '1px solid #ddd', padding: '10px', height: '200px', overflowY: 'scroll' }}>
            {chat.map((msg, idx) => (
                <p key={idx}>{msg}</p>
            ))}
        </div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            style={{ width: '80%', padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>
            Send
        </button>
    </div>
);
}
