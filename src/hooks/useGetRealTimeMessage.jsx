import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { setTypingStatus } from "../redux/userSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // --- ADD THIS GUARD CLAUSE ---
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    socket.on("messagesSeen", ({ receiverId }) => {
      if (selectedUser?._id === receiverId) {
        const updatedMessages = messages.map((msg) => {
          if (msg.opened === false) {
            return { ...msg, opened: true };
          }
          return msg;
        });
        dispatch(setMessages(updatedMessages));
      }
    });

    socket.on("typing", (senderId) => {
      if (selectedUser?._id === senderId) dispatch(setTypingStatus(true));
    });

    socket.on("stop typing", () => dispatch(setTypingStatus(false)));

    return () => {
      socket.off("newMessage");
      socket.off("messagesSeen");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [socket, messages, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;