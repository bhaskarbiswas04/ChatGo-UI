import { useState, useRef, useEffect } from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import EmojiPicker from 'emoji-picker-react'; // Import the picker
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function SendInput() {

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { selectedUser, authUser } = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const emojiPickerRef = useRef(null);

  


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
    if (!message.trim()) return;

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

    setShowEmojiPicker(false);
    setMessage("");
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the picker is open AND the click was NOT inside the emojiPickerRef
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    // Add listener to the whole document
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showEmojiPicker]);

  return (
    <form onSubmit={onSubmitHandler} className="py-4 mx-3 relative">
      {/* Emoji Picker Popup */}
      <div ref={emojiPickerRef}>
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-50">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              theme="dark" // Matches your UI
              height={400}
              width={300}
            />
          </div>
        )}
      </div>

      <div className="w-full relative flex items-center">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute left-3 text-gray-400 hover:text-white"
        >
          <FiSmile size={20} />
        </button>

        <input
          type="text"
          value={message}
          onChange={onChangeHandler}
          placeholder="Type your Message..."
          className="border p-3 pl-10 text-sm rounded-lg block w-full text-white bg-gray-700"
        />

        <button type="submit" className="absolute right-3 text-accent">
          <FiSend size={20} />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
