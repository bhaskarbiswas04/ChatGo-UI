import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { setLoading } from "../redux/loadingSlice";

function useGetMessages() {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store=>store.user);

  useEffect(() => {
    const fetchMessages = async () => {

      dispatch(setLoading(true));

      try {
        const response = await axios.get(
          `https://chatgo-app-backend-1.onrender.com/api/v1/message/${selectedUser?._id}`,
        );
        console.log(response);
        dispatch(setMessages(response.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser?._id, dispatch]);
}

export default useGetMessages;
