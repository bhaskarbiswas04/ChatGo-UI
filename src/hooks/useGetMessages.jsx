import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function useGetMessages() {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store=>store.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `https://chat-go-app-backend.vercel.app/api/v1/message/${selectedUser?._id}`,
        );
        console.log(response);
        dispatch(setMessages(response.data))
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
}

export default useGetMessages;
