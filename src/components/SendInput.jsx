import { useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function SendInput() {

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { selectedUser, authUser } = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();


  const onChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!socket || !selectedUser) return;

    // Send "typing" event if not already sent
    if (!typing) {
      setTyping(true);
      socket.emit("typing", {
        receiverId: selectedUser._id,
        senderId: authUser._id,
      });
    }

    // Clear existing timer using the Ref
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timer into the Ref
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", { receiverId: selectedUser._id });
      setTyping(false);
    }, 3000);
  };

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("stop typing", { receiverId: selectedUser._id });
    setTyping(false);

    try {
      const response = await axios.post(
        `https://chatgo-app-backend-1.onrender.com/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
      dispatch(setMessages([...messages, response?.data?.newMessage]));

    } catch (error) {
      console.log(error); 
    }

    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler} className="py-4 mx-3">
      <div className="w-full relative">
        <input
          type="text"
          onChange={onChangeHandler}
          value={message}
          placeholder="Type your Message..."
          className="border p-3 text-sm rounded-lg block w-full text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 inset-e-0 flex items-center"
        >
          <FiSend className="mr-4 size-5 cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
