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
    // Listen for new messages
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    // Listen for typing start
    // We only show the indicator if the sender is our currently selected user
    socket?.on("typing", (senderId) => {
      if (selectedUser?._id === senderId) {
        dispatch(setTypingStatus(true));
      }
    });

    // Listen for typing stop
    socket?.on("stop typing", () => {
      dispatch(setTypingStatus(false));
    });

    // Cleanup: Unsubscribe from all events
    return () => {
      socket?.off("newMessage");
      socket?.off("typing");
      socket?.off("stop typing");
    };
  }, [socket, messages, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;
