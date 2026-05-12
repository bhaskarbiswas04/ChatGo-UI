import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";

function Message({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const fromMe = message?.senderId === authUser?._id;
  const formattedTime = extractTime(message?.createdAt);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

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

      <div className="chat-footer mt-1 flex items-center gap-1">
        <time className="text-[10px] opacity-50 uppercase">
          {formattedTime}
        </time>

        {/* --- READ RECEIPT ICONS --- */}
        {fromMe && (
          <span className={message.opened ? "text-blue-400" : "text-gray-400"}>
            {message.opened ? (
              <IoCheckmarkDoneSharp size={15} title="Seen" />
            ) : (
              <IoCheckmarkSharp size={15} title="Sent" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default Message;