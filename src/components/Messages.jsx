import { useSelector } from "react-redux";
import Message from "../components/Message";
import useGetMessages from "../hooks/useGetMessages";

function Messages() {
  useGetMessages();
  const { messages } = useSelector(store=>store.message)
  if(!messages) return;

  return (
    <div className="p-4 flex-1 overflow-auto">
      {
        messages?.map(message => {
          return (
            <Message key={message._id} message={message} />
          )
        })
      }
    </div>
  )
}

export default Messages