import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef()

  useEffect(() =>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  // console.log(message);
  
  
    const getTimeString = (timestamp) => {
      const currentTime = new Date().getTime();
      const messageTime = new Date(timestamp).getTime();
      const diffInMs = currentTime - messageTime;
      if (diffInMs < 60 * 1000) {
        return 'Just now';
      } else {
        return new Date().toLocaleString(); // Display current date and time
      }
    };
  return (
    <div ref={ref}
    className={`message ${message.senderId === currentUser.uid ? 'owner' : ''}`}

    >
      <div className="messageInfo">
          <img src={message.senderId === currentUser.uid 
          ? currentUser.photoURL 
          : data.user.photoURL
        }
           alt="" 
           />
          <span>{getTimeString(message.timestamp)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
         {message.img && <img src={message.img} alt=""/>} 
      </div>
    </div>
  )
}

export default Message
