import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

function Message({message}) {

  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store=>store.user);

  useEffect(()=>{
    scroll.current?.scrollIntoView();
  })

  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="chat bubble component"
            src={authUser?._id === message.senderId ? authUser?.profilePhoto : selectedUser.profilePhoto }
          />
        </div>
      </div>
      <div className="chat-footer mt-2">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble chat-bubble-accent">{message?.message}</div>
    </div>
  );
}

export default Message