import React from 'react'

function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-footer mt-2">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble chat-bubble-accent">
        You were the Chosen One!
      </div>
    </div>
  );
}

export default Message