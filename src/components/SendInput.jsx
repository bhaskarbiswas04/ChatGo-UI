import { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function SendInput() {

  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const {messages} = useSelector(store=>store.message)

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://chat-go-app-backend.vercel.app/api/v1/message/send/${selectedUser?._id}`, {message},
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
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
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type your Message..."
          className="border p-3 text-sm rounded-lg block w-full text-white"
        />
        <button type="submit" className="absolute inset-y-0 inset-e-0 flex items-center">
          <FiSend className="mr-4 size-5 cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
