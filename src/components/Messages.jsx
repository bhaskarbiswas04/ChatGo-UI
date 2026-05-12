import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import useGetMessages from "../hooks/useGetMessages";
import { useEffect } from "react";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

function Messages() {
  useGetMessages();
  useGetRealTimeMessage();

  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);
  const { socket } = useSelector((store) => store.socket);
  const { selectedUser, authUser } = useSelector((store) => store.user);

  // --- READ RECEIPT LOGIC ---
  useEffect(() => {
    if (socket && selectedUser && messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // If the last message is from the other guy and is unread
      if (lastMessage.senderId === selectedUser._id && !lastMessage.opened) {
        console.log("Emitting markAsSeen to server...");
        socket.emit("markAsSeen", {
          senderId: selectedUser._id,
          receiverId: authUser._id,
        });
      }
    }
  }, [selectedUser, messages, socket, authUser]);

  if (!messages) return null;

  return (
    <div className="p-4 flex-1 overflow-auto">
      {messages &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
}

export default Messages;