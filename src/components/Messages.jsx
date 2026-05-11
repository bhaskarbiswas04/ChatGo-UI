import { useSelector } from "react-redux";
import Message from "../components/Message";
import useGetMessages from "../hooks/useGetMessages";
import { useEffect } from "react";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

function Messages() {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector(store=>store.message);
  if(!messages) return;

  return (
    <div className="p-4 flex-1 overflow-auto">
      {
        messages && messages?.map(message => {
          return (
            <Message key={message._id} message={message} />
          )
        })
      }
    </div>
  )
}

export default Messages