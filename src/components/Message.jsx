import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime"; // Ensure path is correct

function Message({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  // 1. Determine if current user is the sender
  const fromMe = message?.senderId === authUser?._id;

  // 2. Format the time using your utility
  const formattedTime = extractTime(message?.createdAt);

  // 3. Scroll to the latest message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); // Trigger when message changes

  return (
    <div ref={scroll} className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={fromMe ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${
          fromMe ? "chat-bubble-accent" : "chat-bubble-success"
        }`}
      >
        {message?.message}
      </div>

      <div className="chat-footer mt-1">
        <time className="text-[10px] opacity-50 uppercase"> 
          {formattedTime}
        </time>
      </div>
    </div>
  );
}

export default Message;